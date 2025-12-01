import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Activity, Zap, Database, FileText, Microscope, Dna, Brain, Share2, Printer, Download } from 'lucide-react';
import { Button } from '../components/ui/Button';

const CaseStat = ({ label, value, trend }) => (
  <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
    <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">{label}</div>
    <div className="text-2xl font-bold text-white flex items-end gap-2">
      {value}
      {trend && <span className="text-xs text-emerald-400 mb-1">{trend}</span>}
    </div>
  </div>
);

const UseCase = () => {
  const navigate = useNavigate();

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen pt-24 pb-20 bg-[#020617] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono mb-6">
                <Microscope className="w-3 h-3" />
                LIVE CASE STUDY
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight font-display">
                Metformin <span className="text-slate-500">Repurposing Analysis</span>
              </h1>
              <p className="text-xl text-slate-400 max-w-3xl leading-relaxed">
                Analyzing the potential of Metformin (Glucophage) for novel therapeutic indications beyond Type 2 Diabetes using CuraVyom's Agentic AI swarm.
              </p>
            </div>
            
            {/* Actions Toolbar */}
            <div className="flex gap-3 shrink-0">
              <Button variant="secondary" size="sm" icon={Share2} onClick={handleShare}>Share</Button>
              <Button variant="secondary" size="sm" icon={Printer} onClick={handlePrint}>Print</Button>
              <Button variant="primary" size="sm" icon={Download} onClick={() => navigate('/report')}>Download Report</Button>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Molecule Info */}
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-slate-950/50 border border-white/10 backdrop-blur-xl">
              <div className="aspect-square rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center mb-6 border border-white/5 relative overflow-hidden group">
                <Dna className="w-32 h-32 text-cyan-400 group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-cyan-500/10 mix-blend-overlay" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Metformin HCl</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-2 py-1 rounded bg-white/5 border border-white/10 text-xs text-slate-300">Biguanide</span>
                <span className="px-2 py-1 rounded bg-white/5 border border-white/10 text-xs text-slate-300">WHO Essential Med</span>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">
                First-line medication for the treatment of type 2 diabetes, particularly in people who are overweight. It is also used in the treatment of polycystic ovary syndrome.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <CaseStat label="PubChem CID" value="4091" />
              <CaseStat label="Mol. Weight" value="129.16" />
              <CaseStat label="Safety Profile" value="High" trend="FDA Approved" />
              <CaseStat label="Patent Status" value="Generic" />
            </div>
          </div>

          {/* Middle Column: AI Analysis */}
          <div className="lg:col-span-2 space-y-6">
            <div className="p-8 rounded-2xl bg-slate-950/50 border border-white/10 backdrop-blur-xl h-full">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Brain className="w-5 h-5 text-purple-400" />
                AI Generated Hypotheses
              </h3>

              <div className="space-y-4">
                {/* Hypothesis 1 */}
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-500/30 transition-colors group cursor-pointer">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-white group-hover:text-cyan-400 transition-colors">Neuroprotection / Alzheimer's</h4>
                    <span className="px-2 py-1 rounded bg-green-500/20 text-green-400 text-xs font-bold">92% Confidence</span>
                  </div>
                  <p className="text-sm text-slate-400 mb-3">
                    Agents identified strong correlation between AMPK activation and reduced amyloid-beta plaque formation. Clinical trial data (NCT0409...) supports cognitive preservation.
                  </p>
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1"><Database className="w-3 h-3" /> 142 Papers</span>
                    <span className="flex items-center gap-1"><Activity className="w-3 h-3" /> 3 Trials</span>
                  </div>
                </div>

                {/* Hypothesis 2 */}
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-500/30 transition-colors group cursor-pointer">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-white group-hover:text-cyan-400 transition-colors">Anti-Aging / Longevity</h4>
                    <span className="px-2 py-1 rounded bg-yellow-500/20 text-yellow-400 text-xs font-bold">85% Confidence</span>
                  </div>
                  <p className="text-sm text-slate-400 mb-3">
                    mTOR inhibition pathway analysis suggests potential for lifespan extension. TAME (Targeting Aging with Metformin) trial protocol analyzed and validated.
                  </p>
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1"><Database className="w-3 h-3" /> 89 Papers</span>
                    <span className="flex items-center gap-1"><Activity className="w-3 h-3" /> 1 Trial</span>
                  </div>
                </div>

                {/* Hypothesis 3 */}
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-500/30 transition-colors group cursor-pointer">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-white group-hover:text-cyan-400 transition-colors">Oncology Adjunct</h4>
                    <span className="px-2 py-1 rounded bg-blue-500/20 text-blue-400 text-xs font-bold">78% Confidence</span>
                  </div>
                  <p className="text-sm text-slate-400 mb-3">
                    Potential synergy with checkpoint inhibitors in specific solid tumors. Metabolic reprogramming of T-cells enhances anti-tumor immunity.
                  </p>
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1"><Database className="w-3 h-3" /> 215 Papers</span>
                    <span className="flex items-center gap-1"><Activity className="w-3 h-3" /> 12 Trials</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex justify-end">
                <Button variant="primary" icon={ArrowRight} onClick={() => navigate('/report')}>
                  View Full Analysis Report
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UseCase;
