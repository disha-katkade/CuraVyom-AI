import React from 'react';
import { Shield, Lock, Eye, FileText, Server, Globe } from 'lucide-react';

const Section = ({ icon: Icon, title, children }) => (
  <div className="mb-12 relative group">
    <div className="absolute -left-8 top-0 bottom-0 w-[1px] bg-gradient-to-b from-cyan-500/50 to-transparent opacity-20 group-hover:opacity-100 transition-opacity" />
    <div className="flex items-center gap-3 mb-4">
      <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
        <Icon className="w-5 h-5" />
      </div>
      <h2 className="text-xl font-bold text-white">{title}</h2>
    </div>
    <div className="text-slate-400 leading-relaxed space-y-4 text-sm pl-2">
      {children}
    </div>
  </div>
);

const Privacy = () => {
  return (
    <div className="min-h-screen pt-24 pb-20 bg-[#020617] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono mb-6">
            <Shield className="w-3 h-3" />
            LEGAL COMPLIANCE
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight font-display">
            Privacy <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Policy</span>
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto">
            At CuraVyom, we are committed to protecting your research data and personal information with enterprise-grade security protocols.
          </p>
          <div className="mt-8 text-xs font-mono text-slate-500">
            Last Updated: November 30, 2025
          </div>
        </div>

        {/* Content */}
        <div className="bg-slate-950/50 border border-white/10 rounded-2xl p-8 md:p-12 backdrop-blur-xl relative">
          <div className="absolute top-0 right-0 p-4 opacity-20">
            <Shield className="w-64 h-64 text-cyan-500" />
          </div>

          <Section icon={Eye} title="Data Collection & Usage">
            <p>
              We collect information you provide directly to us when you create an account, use our interactive services, or communicate with us. This may include:
            </p>
            <ul className="list-disc pl-5 space-y-2 marker:text-cyan-500">
              <li>Account credentials and professional affiliation details.</li>
              <li>Research queries, molecule structures, and uploaded datasets for analysis.</li>
              <li>Usage data and interaction logs with our AI agents.</li>
            </ul>
          </Section>

          <Section icon={Lock} title="Security Measures">
            <p>
              We employ military-grade encryption (AES-256) for data at rest and TLS 1.3 for data in transit. Our infrastructure is compliant with:
            </p>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="p-3 rounded bg-white/5 border border-white/10 text-center">
                <span className="block text-cyan-400 font-bold">HIPAA</span>
                <span className="text-xs text-slate-500">Compliant</span>
              </div>
              <div className="p-3 rounded bg-white/5 border border-white/10 text-center">
                <span className="block text-cyan-400 font-bold">GDPR</span>
                <span className="text-xs text-slate-500">Ready</span>
              </div>
            </div>
          </Section>

          <Section icon={Server} title="Data Retention">
            <p>
              Research data is retained only for as long as necessary to fulfill the purposes for which it was collected, including for the purposes of satisfying any legal, accounting, or reporting requirements. You may request deletion of your data at any time via the dashboard.
            </p>
          </Section>

          <Section icon={Globe} title="Third-Party Sharing">
            <p>
              We do not sell your personal data. We may share anonymized, aggregated insights with academic partners for the advancement of medical science, strictly under non-disclosure agreements.
            </p>
          </Section>

          <div className="mt-12 pt-8 border-t border-white/10 text-center">
            <p className="text-slate-500 text-sm">
              For any privacy-related concerns, please contact our Data Protection Officer at <a href="mailto:privacy@curavyom.ai" className="text-cyan-400 hover:underline">privacy@curavyom.ai</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
