import React, { useState, useEffect, useCallback, useRef } from 'react';
import { config } from '../../config';
import { Send, User, Bot, Paperclip, Mic, X, FileText, Loader2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export const ChatInterface = ({ onLog, onAgentUpdate, onResponse }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'system',
      text: 'Welcome to CuraVyom AI. I am the Master Agent. How can I assist with your drug repurposing research today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [systemStatus, setSystemStatus] = useState('Ready');
  const [isListening, setIsListening] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  
  const ws = useRef(null);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    // Initialize WebSocket connection
    ws.current = new WebSocket(config.endpoints.chat);

    ws.current.onopen = () => {
      console.log('Connected to WebSocket');
      setSystemStatus('Connected to Agent Core');
    };

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      if (data.type === 'log') {
        setSystemStatus(data.content);
        if (onLog) onLog(data.content);
      } else if (data.type === 'response') {
        const response = data.data;
        const newMessage = {
          id: response.id || Date.now(),
          sender: 'agent',
          agent: response.agent || 'Master Agent',
          text: response.text,
          timestamp: response.timestamp || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          workflow: response.workflow,
          metadata: response.metadata
        };
        setMessages((prev) => [...prev, newMessage]);
        setIsTyping(false);
        setSystemStatus('Ready');
        
        // Update agent status if callback provided
        if (onAgentUpdate) {
          // Reset all to standby first (simplified logic)
          // In a real app, we'd track individual agent states
          onAgentUpdate({ 'Master Orchestrator': 'Active' });
          setTimeout(() => onAgentUpdate({ 'Master Orchestrator': 'Standby' }), 2000);
        }
        
        if (onResponse) {
          onResponse(response);
        }
      }
    };

    ws.current.onclose = () => {
      console.log('Disconnected from WebSocket');
      setSystemStatus('Disconnected');
    };

    // Initialize Speech Recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map((result) => result[0])
          .map((result) => result.transcript)
          .join('');
        setInput(transcript);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
      
      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
      };
    }

    return () => {
      if (ws.current) {
        ws.current.close();
      }
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [onLog, onAgentUpdate, onResponse]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e) => {
    e && e.preventDefault();
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    setSystemStatus('Processing...');

    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(input);
    } else {
      console.error('WebSocket is not open');
      setSystemStatus('Connection Error');
      setIsTyping(false);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    
    // Add a temporary message for the upload
    const uploadMessageId = Date.now();
    setMessages(prev => [...prev, {
      id: uploadMessageId,
      sender: 'user',
      text: `Uploading ${file.name}...`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isUpload: true
    }]);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(config.endpoints.upload, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      // Update the upload message or add a system response
      setMessages(prev => prev.map(msg => 
        msg.id === uploadMessageId 
          ? { ...msg, text: `Uploaded: ${file.name}` } 
          : msg
      ));

      // Add system analysis response
      setMessages(prev => [...prev, {
        id: Date.now(),
        sender: 'agent',
        agent: 'Document Agent',
        text: data.analysis || `Analyzed ${file.name}. Ready to incorporate findings into the knowledge graph.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }]);

    } catch (error) {
      console.error('Upload failed:', error);
      setMessages(prev => prev.map(msg => 
        msg.id === uploadMessageId 
          ? { ...msg, text: `Failed to upload ${file.name}` } 
          : msg
      ));
    } finally {
      setIsUploading(false);
      // Reset file input
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-transparent">
      {/* Header */}
      <div className="px-6 py-4 border-b border-white/5 flex justify-between items-center bg-white/5">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            {/* Logo Container */}
            <div className="relative group perspective-1000">
              <div className="relative w-10 h-10 flex items-center justify-center transform-style-3d transition-transform duration-500 group-hover:rotate-y-12 group-hover:rotate-x-12">
                {/* Outer Rotating Ring */}
                <div className="absolute inset-0 rounded-xl border border-cyan-500/30 animate-[spin_10s_linear_infinite] group-hover:border-cyan-400/60 transition-colors" />
                <div className="absolute inset-0 rounded-xl border border-blue-500/30 animate-[spin_15s_linear_infinite_reverse] scale-110 group-hover:border-blue-400/60 transition-colors" />
                
                {/* Glass Container */}
                <div className="absolute inset-1 bg-gradient-to-br from-cyan-500/10 to-blue-600/10 rounded-lg backdrop-blur-sm border border-white/10 shadow-[0_0_15px_rgba(6,182,212,0.2)] group-hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all duration-500 flex items-center justify-center overflow-hidden">
                  {/* Holographic Shine */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:animate-shine" />
                  
                  {/* The Logo */}
                  <img src="/logo.png" alt="CuraVyom Logo" className="w-6 h-6 object-contain drop-shadow-[0_0_10px_rgba(6,182,212,0.8)] relative z-10" />
                </div>
                
                {/* Glow Orb Behind */}
                <div className="absolute inset-0 bg-cyan-500/20 blur-xl rounded-full -z-10 group-hover:bg-cyan-400/30 transition-colors duration-500 animate-pulse-slow" />
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <h2 className="text-xl font-bold text-white tracking-tight font-display">
                Cura<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Vyom</span>
              </h2>
              <span className="text-[10px] text-cyan-500/60 uppercase tracking-[0.2em] font-mono">AI</span>
            </div>
          </div>

          <div className="h-8 w-px bg-white/10" />

          <div className="flex items-center gap-2">
            <div className="relative flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${systemStatus === 'Ready' ? 'bg-green-400' : 'bg-cyan-400'}`}></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 ${systemStatus === 'Ready' ? 'bg-green-500' : 'bg-cyan-500'}`}></span>
            </div>
            <span className="text-[10px] font-mono text-cyan-400/60 uppercase tracking-wider">
              {systemStatus === 'Ready' ? 'System Online' : systemStatus}
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-cyan-950/20 border-cyan-500/20 text-cyan-400 text-[10px] px-2 py-0.5 font-mono tracking-wider">
            V2.0.4
          </Badge>
        </div>
      </div>

      {/* Messages */}
      <div 
        ref={messagesEndRef}
        className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent"
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-4 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 border border-white/10 ${
              msg.sender === 'user' ? 'bg-white/10' : 
              msg.agent === 'Master Agent' ? 'bg-cyan-500/20 text-cyan-400' : 'bg-white/5 text-white/60'
            }`}>
              {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            <div className={`flex flex-col max-w-[80%] ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
              {msg.sender !== 'user' && (
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-[10px] font-mono uppercase tracking-wider ${
                    msg.agent === 'Master Agent' ? 'text-cyan-400' : 'text-white/40'
                  }`}>
                    {msg.agent}
                  </span>
                  <span className="text-[10px] text-white/20">•</span>
                  <span className="text-[10px] text-white/20">{msg.timestamp}</span>
                </div>
              )}
              
              <div className={`p-4 rounded-2xl backdrop-blur-sm border ${
                msg.sender === 'user' 
                  ? 'bg-cyan-500/10 border-cyan-500/20 text-white rounded-tr-sm' 
                  : 'bg-white/5 border-white/5 text-white/80 rounded-tl-sm'
              }`}>

                {msg.isUpload ? (
                   <div className="flex items-center gap-2">
                     <FileText className="w-4 h-4" />
                     <span className="text-sm italic">{msg.text}</span>
                   </div>
                ) : (
                  <div className="text-sm leading-relaxed prose prose-invert prose-p:my-1 prose-headings:my-2 prose-ul:my-1 prose-li:my-0.5 max-w-none">
                    <ReactMarkdown 
                      remarkPlugins={[remarkGfm]}
                      components={{
                        p: ({node, ...props}) => <p className="mb-2 last:mb-0" {...props} />,
                        ul: ({node, ...props}) => <ul className="list-disc pl-4 mb-2" {...props} />,
                        ol: ({node, ...props}) => <ol className="list-decimal pl-4 mb-2" {...props} />,
                        li: ({node, ...props}) => <li className="mb-1" {...props} />,
                        a: ({node, ...props}) => <a className="text-cyan-400 hover:underline" {...props} />,
                        strong: ({node, ...props}) => <strong className="font-bold text-cyan-100" {...props} />,
                      }}
                    >
                      {msg.text}
                    </ReactMarkdown>
                  </div>
                )}
              </div>
              
              {msg.sender === 'user' && (
                <span className="text-[10px] text-white/20 mt-1">{msg.timestamp}</span>
              )}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex gap-4">
             <div className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center border border-white/10">
               <Bot className="w-4 h-4" />
             </div>
             <div className="bg-white/5 border border-white/5 px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-1">
               <div className="w-1.5 h-1.5 rounded-full bg-cyan-400/50 animate-bounce" style={{ animationDelay: '0ms' }} />
               <div className="w-1.5 h-1.5 rounded-full bg-cyan-400/50 animate-bounce" style={{ animationDelay: '150ms' }} />
               <div className="w-1.5 h-1.5 rounded-full bg-cyan-400/50 animate-bounce" style={{ animationDelay: '300ms' }} />
             </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 bg-black/20 border-t border-white/5 backdrop-blur-md">
        <form onSubmit={handleSend} className="relative flex items-center gap-2">
          <div className="absolute left-1 flex items-center">
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              onChange={handleFileUpload}
              accept=".pdf,.txt,.doc,.docx,.png,.jpg"
            />
            <Button 
              variant="ghost" 
              size="icon" 
              type="button" 
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="text-white/40 hover:text-cyan-400 hover:bg-cyan-400/10 rounded-full w-8 h-8"
            >
              {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Paperclip className="w-4 h-4" />}
            </Button>
          </div>
          
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={isListening ? "Listening..." : "Ask anything about drug repurposing..."}
            className={`w-full bg-white/5 border border-white/10 rounded-full pl-10 pr-24 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all ${isListening ? 'animate-pulse border-red-500/50' : ''}`}
          />
          
          <div className="absolute right-1 flex items-center gap-1">
            <Button 
              variant="ghost" 
              size="icon" 
              type="button" 
              onClick={toggleListening}
              className={`rounded-full w-8 h-8 transition-colors ${isListening ? 'text-red-400 bg-red-400/10' : 'text-white/40 hover:text-cyan-400 hover:bg-cyan-400/10'}`}
            >
              {isListening ? <Loader2 className="w-4 h-4 animate-spin" /> : <Mic className="w-4 h-4" />}
            </Button>
            <Button 
              type="submit" 
              disabled={!input.trim()}
              className={`rounded-full w-8 h-8 p-0 flex items-center justify-center transition-all duration-300 ${
                input.trim() 
                  ? 'bg-cyan-500 hover:bg-cyan-400 text-black shadow-[0_0_15px_rgba(34,211,238,0.5)]' 
                  : 'bg-white/10 text-white/20'
              }`}
            >
              <Send className="w-4 h-4 ml-0.5" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
