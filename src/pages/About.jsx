import React from 'react';
import { Linkedin, Code, Cpu, Globe, Zap, Award, Users, Mail, Github } from 'lucide-react';

const TeamMember = ({ name, role, skills, education, email, linkedin, github }) => (
  <div className="group relative h-full">
    <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/20 to-blue-500/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="relative p-6 rounded-2xl bg-slate-950/50 border border-white/10 backdrop-blur-md hover:border-cyan-500/30 transition-all duration-300 group-hover:-translate-y-2 h-full flex flex-col">
      {/* Avatar */}
      <div className="w-24 h-24 mx-auto mb-6 relative shrink-0">
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 blur-md opacity-20 group-hover:opacity-50 transition-opacity" />
        <div className="relative w-full h-full rounded-full bg-slate-900 border border-white/10 flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-300">
          <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-blue-500">{name.charAt(0)}</span>
        </div>
        <div className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center text-cyan-400">
          <Code className="w-4 h-4" />
        </div>
      </div>

      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">{name}</h3>
        <p className="text-sm text-cyan-400 font-mono mb-2">{role}</p>
        <p className="text-xs text-slate-500 leading-relaxed">{education}</p>
      </div>

      <div className="flex flex-wrap justify-center gap-2 mb-6 grow content-start">
        {skills.map((skill) => (
          <span key={skill} className="text-[10px] px-2 py-1 rounded-full bg-white/5 text-slate-400 border border-white/5 group-hover:border-cyan-500/20 group-hover:text-cyan-400 transition-colors">
            {skill}
          </span>
        ))}
      </div>

      <div className="flex justify-center gap-4 border-t border-white/5 pt-6 mt-auto">
        <a href={`mailto:${email}`} className="p-2 rounded-lg bg-white/5 text-slate-400 hover:bg-cyan-500/10 hover:text-cyan-400 transition-all" title="Email">
          <Mail className="w-4 h-4" />
        </a>
        <a href={linkedin} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white/5 text-slate-400 hover:bg-blue-500/10 hover:text-blue-400 transition-all" title="LinkedIn">
          <Linkedin className="w-4 h-4" />
        </a>
        <a href={github} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white/5 text-slate-400 hover:bg-slate-500/10 hover:text-white transition-all" title="GitHub">
          <Github className="w-4 h-4" />
        </a>
      </div>
    </div>
  </div>
);

const StatCard = ({ icon: Icon, value, label }) => (
  <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm text-center">
    <Icon className="w-8 h-8 text-cyan-400 mx-auto mb-4" />
    <div className="text-3xl font-bold text-white mb-1 font-display">{value}</div>
    <div className="text-xs text-slate-400 uppercase tracking-wider">{label}</div>
  </div>
);

const About = () => {
  return (
    <div className="min-h-screen pt-24 pb-20 bg-[#020617] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono mb-6">
            <Users className="w-3 h-3" />
            TEAM: BIT-MANIPULATORS
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight font-display">
            Architecting the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Future of Medicine</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            We are a collective of AI engineers, data scientists, and pharmaceutical experts united by a single mission: to accelerate drug discovery through agentic intelligence.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-24">
          <StatCard icon={Cpu} value="12+" label="AI Agents" />
          <StatCard icon={Globe} value="24/7" label="Global Research" />
          <StatCard icon={Zap} value="100x" label="Faster Discovery" />
          <StatCard icon={Award} value="98%" label="Accuracy Rate" />
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24 max-w-4xl mx-auto">
          <TeamMember 
            name="Jayesh Vijay Muley" 
            role="AI Architect & Backend Lead" 
            education="Integrated MTech in Artificial Intelligence (2022–2027), Vellore Institute of Technology, Bhopal"
            email="jayeshmuley2022@vitbhopal.ac.in"
            linkedin="https://www.linkedin.com/in/mr-jayeshmuley"
            github="https://github.com/jayesh3103"
            skills={[
              'AI & ML', 
              'Agentic AI & LangChain', 
              'Python & Backend', 
              'Data Integration', 
              'System Architecture'
            ]} 
          />
          <TeamMember 
            name="Disha Katkade" 
            role="AI Engineer & Frontend Lead" 
            education="Integrated MTech in Artificial Intelligence (2022–2027), Vellore Institute of Technology, Bhopal"
            email="katkadedisha22@gmail.com"
            linkedin="https://www.linkedin.com/in/disha-k-0a6781344"
            github="https://github.com/disha-katkade"
            skills={[
              'NLP', 
              'Data Analysis & Viz', 
              'React / Streamlit', 
              'MongoDB / SQL', 
              'UI/UX Design'
            ]} 
          />
        </div>

        {/* Mission Statement */}
        <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-slate-950/50 backdrop-blur-xl p-12 text-center">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5" />
          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-white mb-6 font-display">Our Mission</h2>
            <p className="text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed font-light italic">
              "To democratize access to advanced drug repurposing tools, enabling researchers to find life-saving treatments faster and more efficiently than ever before."
            </p>
            <div className="mt-8 flex justify-center">
              <div className="h-1 w-20 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
