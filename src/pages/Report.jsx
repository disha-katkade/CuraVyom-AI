import React from 'react';
import { FileText, Download, Share2, Printer, CheckCircle, AlertTriangle, Info } from 'lucide-react';
import { Button } from '../components/ui/Button';

const ReportSection = ({ title, children }) => (
  <div className="mb-8">
    <h3 className="text-lg font-bold text-slate-900 mb-3 uppercase tracking-wider border-b border-slate-200 pb-2">{title}</h3>
    <div className="text-slate-700 leading-relaxed text-sm">
      {children}
    </div>
  </div>
);

const Report = () => {
  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert('Report link copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // In a real app, this would fetch a generated PDF from the backend.
    // For now, we'll trigger the print dialog which allows "Save as PDF".
    window.print();
  };

  return (
    <div className="min-h-screen pt-24 pb-20 bg-[#020617] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Toolbar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">Intelligence Report</h1>
            <p className="text-slate-400 text-sm">Generated on Nov 30, 2025 • ID: #RPT-8829-X</p>
          </div>
          <div className="flex gap-3">
            <Button variant="secondary" size="sm" icon={Share2} onClick={handleShare}>Share</Button>
            <Button variant="secondary" size="sm" icon={Printer} onClick={handlePrint}>Print</Button>
            <Button variant="primary" size="sm" icon={Download} onClick={handleDownload}>Download PDF</Button>
          </div>
        </div>

        {/* Report Paper Preview */}
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden min-h-[800px] relative print:shadow-none print:rounded-none">
          {/* Header Strip */}
          <div className="h-2 bg-gradient-to-r from-cyan-500 to-blue-600 print:hidden" />
          
          <div className="p-12 print:p-8">
            {/* Report Header */}
            <div className="flex justify-between items-start mb-12 border-b border-slate-100 pb-8">
              <div>
                <div className="text-2xl font-bold text-slate-900 mb-1">CuraVyom AI</div>
                <div className="text-sm text-slate-500 uppercase tracking-widest">Pharmaceutical Intelligence</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-slate-900">CONFIDENTIAL</div>
                <div className="text-xs text-slate-500">Authorized Personnel Only</div>
              </div>
            </div>

            {/* Executive Summary */}
            <ReportSection title="Executive Summary">
              <p className="mb-4">
                This report details the findings of the automated agentic analysis for <strong>Metformin (CID: 4091)</strong>. 
                The system has identified high-confidence repurposing opportunities in neurodegenerative diseases and longevity.
              </p>
              <div className="flex gap-4 mt-4">
                <div className="flex-1 p-4 bg-green-50 rounded-lg border border-green-100 print:border-slate-200">
                  <div className="flex items-center gap-2 text-green-700 font-bold mb-1">
                    <CheckCircle className="w-4 h-4" />
                    High Viability
                  </div>
                  <p className="text-xs text-green-800">Strong clinical evidence supports Alzheimer's trials.</p>
                </div>
                <div className="flex-1 p-4 bg-yellow-50 rounded-lg border border-yellow-100 print:border-slate-200">
                  <div className="flex items-center gap-2 text-yellow-700 font-bold mb-1">
                    <AlertTriangle className="w-4 h-4" />
                    Moderate Risk
                  </div>
                  <p className="text-xs text-yellow-800">IP landscape is crowded; novel formulation required.</p>
                </div>
              </div>
            </ReportSection>

            {/* Clinical Analysis */}
            <ReportSection title="Clinical Analysis">
              <p className="mb-4">
                <strong>Mechanism of Action:</strong> Metformin activates AMP-activated protein kinase (AMPK), leading to reduced hepatic glucose production and improved insulin sensitivity.
              </p>
              <p>
                <strong>Relevance to Alzheimer's:</strong> AMPK activation has been shown to induce autophagy, potentially clearing amyloid-beta aggregates. Retrospective cohort studies indicate a 34% reduction in dementia risk among diabetic patients on Metformin compared to other antidiabetics.
              </p>
            </ReportSection>

            {/* Market & IP */}
            <ReportSection title="Market & IP Landscape">
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-slate-900 mb-2 text-xs uppercase">Market Potential</h4>
                  <p>
                    The global Alzheimer's therapeutics market is projected to reach $13.7B by 2030. A repurposed generic with enhanced delivery could capture significant share.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-2 text-xs uppercase">IP Strategy</h4>
                  <p>
                    Composition of matter patents have expired. Strategy should focus on:
                  </p>
                  <ul className="list-disc pl-4 mt-1 space-y-1 text-xs">
                    <li>Novel delivery mechanisms (nanoparticles)</li>
                    <li>Specific dosage regimens for non-diabetic populations</li>
                    <li>Combination therapies</li>
                  </ul>
                </div>
              </div>
            </ReportSection>

            {/* Footer */}
            <div className="mt-20 pt-8 border-t border-slate-100 flex justify-between items-center text-xs text-slate-400">
              <div>Generated by CuraVyom Master Agent v2.0.4</div>
              <div>Page 1 of 1</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;
