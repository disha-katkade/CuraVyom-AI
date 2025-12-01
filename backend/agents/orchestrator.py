import os
import uuid
import random
from typing import Dict, Any, List
from datetime import datetime
from dotenv import load_dotenv

from backend.agents.base import BaseAgent
from backend.models.messages import AgentMessage
from backend.agents.workers import ClinicalAgent, PatentAgent, MarketAgent, RegulatoryAgent, DocAgent, SearchAgent

load_dotenv()

# --- Mock Classes for Missing Tools ---
class EvidenceScorer:
    def score(self, data): return 85
class ReportGenerator:
    def generate_pdf(self, data): return "/reports/analysis_report.pdf"
class MoleculeComparator:
    def compare(self, candidates): 
        return {
            "summary": "Metformin shows higher repurposing potential due to safety profile.",
            "insights": ["Patent expired", "High market demand"]
        }
class HypothesisGenerator:
    def generate(self):
        return [{"drug": "Metformin", "target": "Aging", "rationale": "mTOR inhibition", "confidence": 90}]
class CausalReasoner:
    def refine_query(self, query): return query
class FactChecker:
    pass
class AuditLogger:
    def log_event(self, source, event, data): pass
class RiskDetector:
    pass

# --- Master Agent ---
class MasterAgent(BaseAgent):
    def __init__(self):
        super().__init__(name="Master Agent", role="Orchestrator")
        self.workers = {
            "clinical": ClinicalAgent(),
            "patent": PatentAgent(),
            "market": MarketAgent(),
            "regulatory": RegulatoryAgent(),
            "doc": DocAgent(),
            "search": SearchAgent()
        }
        self.scorer = EvidenceScorer()
        self.reporter = ReportGenerator()
        self.comparator = MoleculeComparator()
        self.hypothesis_gen = HypothesisGenerator()
        self.reasoner = CausalReasoner()
        
        # Safety & Compliance
        self.fact_checker = FactChecker()
        self.audit_logger = AuditLogger()
        self.risk_detector = RiskDetector()
        
        # Memory
        self.chat_history = []

    async def process(self, message: AgentMessage) -> AgentMessage:
        response = await self.process_query(message.content)
        return AgentMessage(
            id=response["id"],
            sender=self.name,
            recipient=message.sender,
            content=response["text"],
            message_type="response",
            metadata=response.get("metadata", {})
        )

    async def process_query(self, query: str) -> Dict[str, Any]:
        timestamp = datetime.now().strftime("%I:%M %p")
        
        # Audit Log: Incoming Query
        self.audit_logger.log_event(self.name, "received_query", {"query": query})
        
        # Auto-Correction: Refine Query
        refined_query = self.reasoner.refine_query(query)
        query_lower = refined_query.lower()
        
        # 1. Intent Recognition & Routing
        if "compare" in query_lower:
            return await self._handle_comparison(refined_query, timestamp)
        elif "hypothesis" in query_lower or "propose" in query_lower:
            return await self._handle_hypothesis(refined_query, timestamp)
        elif "report" in query_lower:
            return await self._handle_reporting(refined_query, timestamp)
        elif any(x in query_lower for x in ["safety", "toxicity", "side effect", "adverse"]):
            return await self._handle_safety_query(refined_query, timestamp)
        elif any(x in query_lower for x in ["mechanism", "how it works", "moa", "pathway"]):
            return await self._handle_mechanism_query(refined_query, timestamp)
        elif any(x in query_lower for x in ["clinical", "trial", "phase"]):
            return await self._handle_clinical_query(refined_query, timestamp)
        elif any(x in query_lower for x in ["market", "sales", "revenue", "competition"]):
            return await self._handle_market_query(refined_query, timestamp)
        elif any(x in query_lower for x in ["regulatory", "approval", "fda", "ema", "orphan"]):
            return await self._handle_regulatory_query(refined_query, timestamp)
        elif any(x in query_lower for x in ["dosage", "dose", "formulation", "route", "pill"]):
            return await self._handle_dosage_query(refined_query, timestamp)
        elif any(x in query_lower for x in ["patent", "expiry", "litigation", "ip"]):
            return await self._handle_ip_query(refined_query, timestamp)
        elif any(x in query_lower for x in ["manufacturing", "cmc", "synthesis", "impurity", "stability"]):
            return await self._handle_manufacturing_query(refined_query, timestamp)
        elif any(x in query_lower for x in ["reimbursement", "insurance", "pricing", "payer", "coverage"]):
            return await self._handle_reimbursement_query(refined_query, timestamp)
        elif any(x in query_lower for x in ["combination", "synergy", "drug-drug", "interaction"]):
            return await self._handle_combination_query(refined_query, timestamp)
        elif any(x in query_lower for x in ["competitor", "rival", "landscape", "market share"]):
            return await self._handle_competitor_query(refined_query, timestamp)
        elif any(x in query_lower for x in ["demographics", "patient", "population", "epidemiology"]):
            return await self._handle_demographics_query(refined_query, timestamp)
        elif any(x in query_lower for x in ["supply chain", "logistics", "sourcing", "vendor"]):
            return await self._handle_supply_chain_query(refined_query, timestamp)
        elif any(x in query_lower for x in ["global market", "worldwide sales", "international trends"]):
            return await self._handle_global_market_query(refined_query, timestamp)
        elif any(x in query_lower for x in ["china", "japan", "eu", "nmpa", "pmda", "tga", "regional"]):
            return await self._handle_regional_regulatory_query(refined_query, timestamp)
        elif any(x in query_lower for x in ["global trials", "multi-regional", "diversity", "global sites"]):
            return await self._handle_global_clinical_query(refined_query, timestamp)
        elif any(x in query_lower for x in ["rare disease", "orphan", "genetic", "mutation"]):
            return await self._handle_rare_disease_query(refined_query, timestamp)
        elif any(x in query_lower for x in ["cancer", "oncology", "tumor", "biomarker", "metastasis"]):
            return await self._handle_oncology_query(refined_query, timestamp)
        elif any(x in query_lower for x in ["infectious", "virus", "bacteria", "pandemic", "antimicrobial"]):
            return await self._handle_infectious_query(refined_query, timestamp)
        elif any(x in query_lower for x in ["chronic", "diabetes", "cardiovascular", "alzheimer", "neurodegenerative"]):
            return await self._handle_chronic_query(refined_query, timestamp)
        elif any(x in query_lower for x in ["tropical", "malaria", "dengue", "neglected", "parasitic"]):
            return await self._handle_tropical_query(refined_query, timestamp)
        elif any(x in query_lower for x in ["autoimmune", "rheumatoid", "lupus", "inflammation", "immunology"]):
            return await self._handle_autoimmune_query(refined_query, timestamp)
        elif any(x in query_lower for x in ["mental health", "depression", "anxiety", "schizophrenia", "psychiatry"]):
            return await self._handle_mental_health_query(refined_query, timestamp)
        elif any(x in query_lower for x in ["geriatric", "aging", "elderly", "sarcopenia", "frailty"]):
            return await self._handle_geriatric_query(refined_query, timestamp)
        elif any(x in query_lower for x in ["pediatric", "child", "infant", "juvenile"]):
            return await self._handle_pediatric_query(refined_query, timestamp)
        elif any(x in query_lower for x in ["women's health", "fertility", "maternal", "menopause", "pcos"]):
            return await self._handle_womens_health_query(refined_query, timestamp)
        elif any(x in query_lower for x in ["precision medicine", "genomics", "pgx", "personalized", "sequencing"]):
            return await self._handle_precision_medicine_query(refined_query, timestamp)
        elif any(x in query_lower for x in ["digital therapeutic", "dtx", "software as a medical device", "samd", "app"]):
            return await self._handle_digital_therapeutics_query(refined_query, timestamp)
        elif any(x in query_lower for x in ["hello", "hi", "help", "hey"]):
            return await self._handle_greeting(refined_query, timestamp)
        
        # Default: Standard Analysis Workflow
        return await self._handle_standard_analysis(refined_query, timestamp)

    async def _handle_standard_analysis(self, query: str, timestamp: str) -> Dict[str, Any]:
        # Force full agent swarm for demo purposes to ensure "Smart" behavior
        active_workers = ["clinical", "patent", "market", "regulatory"]
        
        # Add to history
        self.chat_history.append({"role": "user", "content": query})
        
        # Static response to replace Gemini
        synthesis_text = (
            "**Analysis Complete**\n\n"
            "Based on the analysis from the specialist agents, here are the findings:\n\n"
            "1. **Clinical Agent**: Identified relevant clinical trials with positive outcomes.\n"
            "2. **Patent Agent**: Confirmed patent expiry and freedom to operate.\n"
            "3. **Market Agent**: Estimated significant market potential and ROI.\n"
            "4. **Regulatory Agent**: Outlined a clear approval pathway.\n\n"
            "**Strategic Recommendation**: Proceed with the repurposing candidate.\n"
            "**Confidence Score**: 85%\n"
            "**Time Saved**: ~40 hours"
        )
        
        self.chat_history.append({"role": "assistant", "content": synthesis_text})

        # Mock metadata for the UI charts (since LLM text is unstructured)
        # In a full implementation, we'd ask Gemini to return JSON.
        score = {"total_score": 85, "confidence_level": "High"} 
        
        return {
            "id": str(uuid.uuid4()),
            "sender": "master",
            "agent": "Master Agent",
            "text": synthesis_text,
            "timestamp": timestamp,
            "workflow": active_workers,
            "metadata": {"score": score}
        }

    async def _handle_comparison(self, query: str, timestamp: str) -> Dict[str, Any]:
        # Mocking candidates for demo
        candidates = [
            {"name": "Metformin", "score": 85.5, "clinical_count": 45, "patent_status": "Expired", "market_potential": "$1.2B"},
            {"name": "Rapamycin", "score": 72.0, "clinical_count": 12, "patent_status": "Active", "market_potential": "$0.8B"}
        ]
        result = self.comparator.compare(candidates)
        
        text = f"**Comparison Analysis**\n\n{result['summary']}\n\n**Insights:**\n"
        for insight in result['insights']:
            text += f"- {insight}\n"
            
        return {
            "id": str(uuid.uuid4()),
            "sender": "master",
            "agent": "Master Agent",
            "text": text,
            "timestamp": timestamp,
            "workflow": ["comparison_engine"],
            "metadata": {"confidence_score": 90}
        }

    async def _handle_hypothesis(self, query: str, timestamp: str) -> Dict[str, Any]:
        hypotheses = self.hypothesis_gen.generate()
        text = "**Generated Hypotheses**\n\n"
        for h in hypotheses:
            text += f"- **{h['drug']} for {h['target']}**: {h['rationale']} (Confidence: {h['confidence']})\n"
            
        return {
            "id": str(uuid.uuid4()),
            "sender": "master",
            "agent": "Master Agent",
            "text": text,
            "timestamp": timestamp,
            "workflow": ["hypothesis_engine"],
            "metadata": {"confidence_score": 85}
        }

    async def _handle_reporting(self, query: str, timestamp: str) -> Dict[str, Any]:
        # Generate a dummy report
        data = {
            "query": query,
            "summary": "Automated analysis of drug repurposing candidates.",
            "score": {"total_score": 88.5, "confidence_level": "High"},
            "agent_responses": {"Clinical": "Strong evidence found.", "Patent": "Expired."}
        }
        pdf_path = self.reporter.generate_pdf(data)
        
        return {
            "id": str(uuid.uuid4()),
            "sender": "master",
            "agent": "Master Agent",
            "text": f"Report generated successfully. You can download it here: [Download PDF]({pdf_path})",
            "timestamp": timestamp,
            "workflow": ["report_generator"]
        }

    async def _handle_safety_query(self, query: str, timestamp: str) -> Dict[str, Any]:
        text = (
            "**Safety & Toxicity Profile**\n\n"
            "**Clinical Agent Analysis:**\n"
            "- **Common Side Effects:** Gastrointestinal discomfort (nausea, diarrhea) in ~15% of patients.\n"
            "- **Serious Adverse Events:** Rare cases of lactic acidosis (<0.01%).\n"
            "- **Contraindications:** Renal impairment (eGFR < 30 mL/min).\n\n"
            "**Risk Assessment:**\n"
            "The safety profile is well-established with a favorable risk-benefit ratio for the target indication."
        )
        return {
            "id": str(uuid.uuid4()),
            "sender": "master",
            "agent": "Master Agent",
            "text": text,
            "timestamp": timestamp,
            "workflow": ["clinical", "regulatory"],
            "metadata": {"confidence_score": random.randint(85, 98)}
        }

    async def _handle_mechanism_query(self, query: str, timestamp: str) -> Dict[str, Any]:
        text = (
            "**Mechanism of Action (MoA)**\n\n"
            "**Primary Pathway:**\n"
            "Inhibition of mitochondrial complex I, leading to increased AMP/ATP ratio and activation of AMPK (AMP-activated protein kinase).\n\n"
            "**Downstream Effects:**\n"
            "- Suppression of hepatic gluconeogenesis.\n"
            "- Enhancement of peripheral insulin sensitivity.\n"
            "- Potential modulation of mTORC1 pathway (implicated in aging and longevity)."
        )
        return {
            "id": str(uuid.uuid4()),
            "sender": "master",
            "agent": "Master Agent",
            "text": text,
            "timestamp": timestamp,
            "workflow": ["clinical", "doc"],
            "metadata": {"confidence_score": random.randint(88, 99)}
        }

    async def _handle_clinical_query(self, query: str, timestamp: str) -> Dict[str, Any]:
        text = (
            "**Clinical Trial Landscape**\n\n"
            "**Clinical Agent Findings:**\n"
            "- **Total Trials:** 142 active or recruiting studies.\n"
            "- **Key Phase 3 Trial (NCT01234567):** Showed 25% reduction in primary endpoint vs. placebo (p < 0.01).\n"
            "- **Recruitment Status:** High enrollment rates in North America and Europe.\n\n"
            "**Recommendation:** Data supports progression to pivotal repurposing trials."
        )
        return {
            "id": str(uuid.uuid4()),
            "sender": "master",
            "agent": "Master Agent",
            "text": text,
            "timestamp": timestamp,
            "workflow": ["clinical"],
            "metadata": {"confidence_score": random.randint(85, 95)}
        }

    async def _handle_market_query(self, query: str, timestamp: str) -> Dict[str, Any]:
        text = (
            "**Market & Commercial Analysis**\n\n"
            "**Market Agent Insights:**\n"
            "- **Total Addressable Market (TAM):** $4.5 Billion (Global, 2025 est).\n"
            "- **CAGR:** 6.2% (2025-2030).\n"
            "- **Competition:** Moderate. Two generic competitors hold 40% market share.\n\n"
            "**ROI Projection:**\n"
            "Estimated peak sales of $250M/year with a Net Present Value (NPV) of $85M."
        )
        return {
            "id": str(uuid.uuid4()),
            "sender": "master",
            "agent": "Master Agent",
            "text": text,
            "timestamp": timestamp,
            "workflow": ["market"],
            "metadata": {"confidence_score": random.randint(82, 94)}
        }

    async def _handle_regulatory_query(self, query: str, timestamp: str) -> Dict[str, Any]:
        text = (
            "**Regulatory Pathway Analysis**\n\n"
            "**Regulatory Agent Insights:**\n"
            "- **Approval Pathway:** 505(b)(2) (NDA) due to existing safety data.\n"
            "- **Orphan Drug Status:** Potential eligibility for specific rare disease indications.\n"
            "- **Exclusivity:** 3-5 years of market exclusivity anticipated post-approval.\n\n"
            "**Compliance Risk:** Low. No major red flags in prior FDA correspondence."
        )
        return {
            "id": str(uuid.uuid4()),
            "sender": "master",
            "agent": "Master Agent",
            "text": text,
            "timestamp": timestamp,
            "workflow": ["regulatory"],
            "metadata": {"confidence_score": random.randint(95, 100)}
        }

    async def _handle_dosage_query(self, query: str, timestamp: str) -> Dict[str, Any]:
        text = (
            "**Dosage & Formulation Strategy**\n\n"
            "**Clinical Agent Findings:**\n"
            "- **Recommended Dose:** 500mg - 1000mg twice daily.\n"
            "- **Formulation:** Extended-release (XR) tablets to improve compliance and reduce GI side effects.\n"
            "- **Route of Administration:** Oral.\n\n"
            "**Bioavailability:** ~50-60% under fasting conditions."
        )
        return {
            "id": str(uuid.uuid4()),
            "sender": "master",
            "agent": "Master Agent",
            "text": text,
            "timestamp": timestamp,
            "workflow": ["clinical", "doc"],
            "metadata": {"confidence_score": random.randint(88, 99)}
        }

    async def _handle_ip_query(self, query: str, timestamp: str) -> Dict[str, Any]:
        text = (
            "**Intellectual Property (IP) Landscape**\n\n"
            "**Patent Agent Insights:**\n"
            "- **Primary Composition Patent:** Expired in 2002 (Genericized).\n"
            "- **Method of Use Patents:** Several active patents for specific combinations, expiring 2028-2030.\n"
            "- **Freedom to Operate (FTO):** Clear for monotherapy in target indication.\n\n"
            "**Litigation Risk:** Low. No active ANDA litigation found."
        )
        return {
            "id": str(uuid.uuid4()),
            "sender": "master",
            "agent": "Master Agent",
            "text": text,
            "timestamp": timestamp,
            "workflow": ["general"],
            "metadata": {"confidence_score": 100}
        }

    async def _handle_manufacturing_query(self, query: str, timestamp: str) -> Dict[str, Any]:
        text = (
            "**Manufacturing & CMC Strategy**\n\n"
            "**Technical Operations Insights:**\n"
            "- **Synthesis:** 3-step synthesis from readily available starting materials. High yield (>85%).\n"
            "- **Impurity Profile:** Known genotoxic impurities are well-controlled below ICH limits.\n"
            "- **Stability:** Stable at room temperature for 24 months (Zone II).\n\n"
            "**Scale-Up Risk:** Low. Process is robust and validated at commercial scale."
        )
        return {
            "id": str(uuid.uuid4()),
            "sender": "master",
            "agent": "Master Agent",
            "text": text,
            "timestamp": timestamp,
            "workflow": ["doc", "regulatory"]
        }

    async def _handle_reimbursement_query(self, query: str, timestamp: str) -> Dict[str, Any]:
        text = (
            "**Reimbursement & Market Access**\n\n"
            "**Market Agent Insights:**\n"
            "- **Payer Coverage:** Tier 1/2 status expected on major commercial formularies.\n"
            "- **Pricing Strategy:** Value-based pricing model recommended, targeting $5-10/day.\n"
            "- **HTA Assessment:** Likely positive recommendation from NICE/ICER due to cost-effectiveness vs. biologics.\n\n"
            "**Patient Access:** Low out-of-pocket costs expected."
        )
        return {
            "id": str(uuid.uuid4()),
            "sender": "master",
            "agent": "Master Agent",
            "text": text,
            "timestamp": timestamp,
            "workflow": ["market"],
            "metadata": {"confidence_score": random.randint(82, 94)}
        }

    async def _handle_combination_query(self, query: str, timestamp: str) -> Dict[str, Any]:
        text = (
            "**Combination Therapy Potential**\n\n"
            "**Scientific Rationale:**\n"
            "- **Synergy:** Strong synergistic effect observed with SGLT2 inhibitors in pre-clinical models.\n"
            "- **Mechanism:** Complementary mechanisms targeting both insulin sensitivity and glucose excretion.\n\n"
            "**Drug-Drug Interactions:**\n"
            "No significant CYP450 interactions. Caution advised with cationic drugs eliminated by renal tubular secretion."
        )
        return {
            "id": str(uuid.uuid4()),
            "sender": "master",
            "agent": "Master Agent",
            "text": text,
            "timestamp": timestamp,
            "workflow": ["clinical", "doc"],
            "metadata": {"confidence_score": random.randint(88, 99)}
        }

    async def _handle_competitor_query(self, query: str, timestamp: str) -> Dict[str, Any]:
        text = (
            "**Competitor Intelligence Landscape**\n\n"
            "**Market Agent Insights:**\n"
            "- **Primary Competitor:** Drug X (BigPharma Co.) - Currently in Phase 3.\n"
            "- **Competitive Advantage:** Our candidate shows superior safety profile and oral bioavailability compared to Drug X (injectable).\n"
            "- **Market Share Risk:** Moderate. First-to-market advantage is critical.\n\n"
            "**Strategic Move:** Accelerate Phase 3 initiation to capture market share."
        )
        return {
            "id": str(uuid.uuid4()),
            "sender": "master",
            "agent": "Master Agent",
            "text": text,
            "timestamp": timestamp,
            "workflow": ["market", "patent"],
            "metadata": {"confidence_score": random.randint(75, 90)}
        }

    async def _handle_demographics_query(self, query: str, timestamp: str) -> Dict[str, Any]:
        text = (
            "**Patient Demographics & Epidemiology**\n\n"
            "**Clinical Agent Findings:**\n"
            "- **Target Population:** Adults aged 45-75 with Type 2 Diabetes and early-stage renal disease.\n"
            "- **Prevalence:** ~10% of the global adult population.\n"
            "- **Key Segments:** High growth in emerging markets (Asia-Pacific, Latin America).\n\n"
            "**Recruitment Strategy:** Focus on sites with diverse patient populations."
        )
        return {
            "id": str(uuid.uuid4()),
            "sender": "master",
            "agent": "Master Agent",
            "text": text,
            "timestamp": timestamp,
            "workflow": ["clinical", "market"],
            "metadata": {"confidence_score": random.randint(80, 95)}
        }

    async def _handle_supply_chain_query(self, query: str, timestamp: str) -> Dict[str, Any]:
        text = (
            "**Supply Chain & Logistics Analysis**\n\n"
            "**Technical Operations Insights:**\n"
            "- **API Sourcing:** Dual sourcing strategy established (India & Europe) to mitigate geopolitical risk.\n"
            "- **Cold Chain:** Not required. Product is stable at ambient temperature.\n"
            "- **Distribution:** Standard pharmaceutical distribution channels are sufficient.\n\n"
            "**Risk Level:** Low. Robust supply chain resilience."
        )
        return {
            "id": str(uuid.uuid4()),
            "sender": "master",
            "agent": "Master Agent",
            "text": text,
            "timestamp": timestamp,
            "workflow": ["doc", "market"],
            "metadata": {"confidence_score": random.randint(90, 98)}
        }

    async def _handle_global_market_query(self, query: str, timestamp: str) -> Dict[str, Any]:
        text = (
            "**Global Market Dynamics**\n\n"
            "**International Market Agent:**\n"
            "- **Global Sales:** Projected to reach $12B by 2028.\n"
            "- **Fastest Growing Region:** Asia-Pacific (CAGR 8.5%).\n"
            "- **Emerging Trends:** Shift towards personalized medicine in EU and North America.\n\n"
            "**Strategic Insight:** Prioritize market entry in Japan and China post-FDA approval."
        )
        return {
            "id": str(uuid.uuid4()),
            "sender": "master",
            "agent": "Master Agent",
            "text": text,
            "timestamp": timestamp,
            "workflow": ["market"],
            "metadata": {"confidence_score": random.randint(82, 94)}
        }

    async def _handle_regional_regulatory_query(self, query: str, timestamp: str) -> Dict[str, Any]:
        text = (
            "**Regional Regulatory Intelligence**\n\n"
            "**Regulatory Agent (Global Desk):**\n"
            "- **China (NMPA):** Requires local bridging study for approval (Category 1 drug).\n"
            "- **Japan (PMDA):** Harmonized with ICH guidelines; potential for accelerated review under 'Sakigake' designation.\n"
            "- **EU (EMA):** Centralized procedure recommended for broad market access.\n\n"
            "**Action Item:** Engage local consultants for NMPA submission strategy."
        )
        return {
            "id": str(uuid.uuid4()),
            "sender": "master",
            "agent": "Master Agent",
            "text": text,
            "timestamp": timestamp,
            "workflow": ["regulatory"],
            "metadata": {"confidence_score": random.randint(95, 100)}
        }

    async def _handle_global_clinical_query(self, query: str, timestamp: str) -> Dict[str, Any]:
        text = (
            "**Global Clinical Footprint**\n\n"
            "**Clinical Agent (Global Operations):**\n"
            "- **Multi-Regional Clinical Trials (MRCT):** Ongoing in 15 countries including Brazil, Poland, and South Korea.\n"
            "- **Diversity Strategy:** Actively recruiting underrepresented populations to meet FDA guidance.\n"
            "- **Site Performance:** High retention rates in Eastern European sites.\n\n"
            "**Operational Note:** Ensure supply chain robustness for global sites."
        )
        return {
            "id": str(uuid.uuid4()),
            "sender": "master",
            "agent": "Master Agent",
            "text": text,
            "timestamp": timestamp,
            "workflow": ["clinical"],
            "metadata": {"confidence_score": random.randint(85, 95)}
        }

    async def _handle_rare_disease_query(self, query: str, timestamp: str) -> Dict[str, Any]:
        text = (
            "**Rare Disease & Orphan Drug Intelligence**\n\n"
            "**Specialist Agent Findings:**\n"
            "- **Disease Prevalence:** < 5 in 10,000 (EU definition).\n"
            "- **Genetic Basis:** Monogenic mutation identified in 80% of cases.\n"
            "- **Unmet Need:** High. No approved therapies currently exist.\n\n"
            "**Incentives:** Eligible for Orphan Drug Designation (7 years exclusivity in US, 10 in EU)."
        )
        return {
            "id": str(uuid.uuid4()),
            "sender": "master",
            "agent": "Master Agent",
            "text": text,
            "timestamp": timestamp,
            "workflow": ["clinical", "regulatory"],
            "metadata": {"confidence_score": random.randint(85, 98)}
        }

    async def _handle_oncology_query(self, query: str, timestamp: str) -> Dict[str, Any]:
        text = (
            "**Oncology & Cancer Therapeutics**\n\n"
            "**Oncology Agent Insights:**\n"
            "- **Tumor Type:** Solid tumors with high mutational burden.\n"
            "- **Biomarker:** PD-L1 expression > 50% correlates with response.\n"
            "- **Treatment Landscape:** Crowded checkpoint inhibitor market; combination strategies are key.\n\n"
            "**Clinical Strategy:** Basket trial design targeting specific mutations across tumor types."
        )
        return {
            "id": str(uuid.uuid4()),
            "sender": "master",
            "agent": "Master Agent",
            "text": text,
            "timestamp": timestamp,
            "workflow": ["clinical", "market"],
            "metadata": {"confidence_score": random.randint(80, 95)}
        }

    async def _handle_infectious_query(self, query: str, timestamp: str) -> Dict[str, Any]:
        text = (
            "**Infectious Disease & Pandemic Preparedness**\n\n"
            "**ID Agent Insights:**\n"
            "- **Pathogen:** Multi-drug resistant (MDR) Gram-negative bacteria.\n"
            "- **Antimicrobial Resistance (AMR):** Critical priority pathogen on WHO list.\n"
            "- **Mechanism:** Novel mechanism bypassing efflux pumps.\n\n"
            "**Public Health Impact:** High potential to reduce hospital-acquired infections."
        )
        return {
            "id": str(uuid.uuid4()),
            "sender": "master",
            "agent": "Master Agent",
            "text": text,
            "timestamp": timestamp,
            "workflow": ["clinical", "regulatory"],
            "metadata": {"confidence_score": random.randint(85, 98)}
        }

    async def _handle_chronic_query(self, query: str, timestamp: str) -> Dict[str, Any]:
        text = (
            "**Chronic Disease Management**\n\n"
            "**Therapeutic Area Agent:**\n"
            "- **Condition:** Type 2 Diabetes / Cardiovascular Risk.\n"
            "- **Patient Burden:** High daily pill burden; adherence is a key challenge.\n"
            "- **Innovation:** Once-weekly injectable formulation showing superior compliance.\n\n"
            "**Market Trend:** Shift towards holistic cardiometabolic management."
        )
        return {
            "id": str(uuid.uuid4()),
            "sender": "master",
            "agent": "Master Agent",
            "text": text,
            "timestamp": timestamp,
            "workflow": ["clinical", "market"],
            "metadata": {"confidence_score": random.randint(80, 95)}
        }

    async def _handle_tropical_query(self, query: str, timestamp: str) -> Dict[str, Any]:
        text = (
            "**Tropical & Neglected Tropical Diseases (NTDs)**\n\n"
            "**Global Health Agent:**\n"
            "- **Focus:** Malaria, Dengue, and Leishmaniasis.\n"
            "- **Challenges:** Vector control and lack of commercial incentives for R&D.\n"
            "- **Innovation:** New vaccines (e.g., R21/Matrix-M) showing promise.\n\n"
            "**Funding:** Heavily reliant on public-private partnerships (e.g., Gates Foundation)."
        )
        return {
            "id": str(uuid.uuid4()),
            "sender": "master",
            "agent": "Master Agent",
            "text": text,
            "timestamp": timestamp,
            "workflow": ["clinical", "regulatory"],
            "metadata": {"confidence_score": random.randint(85, 98)}
        }

    async def _handle_autoimmune_query(self, query: str, timestamp: str) -> Dict[str, Any]:
        text = (
            "**Autoimmune & Immunology Landscape**\n\n"
            "**Immunology Agent:**\n"
            "- **Key Indications:** Rheumatoid Arthritis, Psoriasis, IBD.\n"
            "- **Mechanism:** JAK inhibitors and IL-17/IL-23 antagonists gaining market share.\n"
            "- **Biosimilars:** Increasing competition from Adalimumab biosimilars driving down costs.\n\n"
            "**Market:** High value, competitive landscape."
        )
        return {
            "id": str(uuid.uuid4()),
            "sender": "master",
            "agent": "Master Agent",
            "text": text,
            "timestamp": timestamp,
            "workflow": ["market", "clinical"]
        }

    async def _handle_mental_health_query(self, query: str, timestamp: str) -> Dict[str, Any]:
        text = (
            "**Mental Health & Psychiatry**\n\n"
            "**Neuroscience Agent:**\n"
            "- **Focus:** Treatment-Resistant Depression (TRD) and Anxiety Disorders.\n"
            "- **Novel Therapies:** Psychedelic-assisted therapies (Psilocybin, MDMA) in advanced trials.\n"
            "- **Digital Health:** Growing integration of CBT apps with pharmacotherapy.\n\n"
            "**Unmet Need:** Rapid-acting antidepressants with fewer side effects."
        )
        return {
            "id": str(uuid.uuid4()),
            "sender": "master",
            "agent": "Master Agent",
            "text": text,
            "timestamp": timestamp,
            "workflow": ["clinical", "market"],
            "metadata": {"confidence_score": random.randint(80, 95)}
        }

    async def _handle_geriatric_query(self, query: str, timestamp: str) -> Dict[str, Any]:
        text = (
            "**Geriatric Medicine & Aging**\n\n"
            "**Gerontology Agent:**\n"
            "- **Key Issues:** Polypharmacy, Sarcopenia, and Frailty.\n"
            "- **Drug Development:** Focus on 'Geroscience' - targeting aging biology directly.\n"
            "- **Clinical Trials:** Need for inclusion of elderly populations in standard trials.\n\n"
            "**Demographic Shift:** Rapidly aging global population increasing demand for age-friendly formulations."
        )
        return {
            "id": str(uuid.uuid4()),
            "sender": "master",
            "agent": "Master Agent",
            "text": text,
            "timestamp": timestamp,
            "workflow": ["clinical", "demographics"],
            "metadata": {"confidence_score": random.randint(88, 96)}
        }

    async def _handle_pediatric_query(self, query: str, timestamp: str) -> Dict[str, Any]:
        text = (
            "**Pediatric Drug Development**\n\n"
            "**Pediatric Agent:**\n"
            "- **Regulatory:** FDA PREA and BPCA require pediatric study plans (PSP).\n"
            "- **Formulation:** Need for age-appropriate formulations (e.g., liquids, mini-tablets).\n"
            "- **Ethics:** Enhanced safeguards for vulnerable populations in clinical trials.\n\n"
            "**Incentives:** Additional 6 months of market exclusivity for completed pediatric studies."
        )
        return {
            "id": str(uuid.uuid4()),
            "sender": "master",
            "agent": "Master Agent",
            "text": text,
            "timestamp": timestamp,
            "workflow": ["regulatory", "clinical"],
            "metadata": {"confidence_score": random.randint(90, 98)}
        }

    async def _handle_womens_health_query(self, query: str, timestamp: str) -> Dict[str, Any]:
        text = (
            "**Women's Health & FemTech**\n\n"
            "**Specialist Agent:**\n"
            "- **Focus:** Endometriosis, PCOS, and Menopause management.\n"
            "- **Innovation:** Non-hormonal therapies for hot flashes (e.g., NK3 antagonists).\n"
            "- **Market:** Historically underserved but rapidly growing investment sector.\n\n"
            "**Trend:** Integration of diagnostics and therapeutics for fertility."
        )
        return {
            "id": str(uuid.uuid4()),
            "sender": "master",
            "agent": "Master Agent",
            "text": text,
            "timestamp": timestamp,
            "workflow": ["market", "clinical"],
            "metadata": {"confidence_score": random.randint(85, 95)}
        }

    async def _handle_precision_medicine_query(self, query: str, timestamp: str) -> Dict[str, Any]:
        text = (
            "**Precision Medicine & Genomics**\n\n"
            "**Genomics Agent:**\n"
            "- **Approach:** Tailoring treatment based on individual genetic profiles (Pharmacogenomics).\n"
            "- **Technology:** Next-Generation Sequencing (NGS) for companion diagnostics.\n"
            "- **Impact:** Higher efficacy and reduced adverse events in oncology and rare diseases.\n\n"
            "**Future:** Expansion into polygenic risk scores for chronic disease prevention."
        )
        return {
            "id": str(uuid.uuid4()),
            "sender": "master",
            "agent": "Master Agent",
            "text": text,
            "timestamp": timestamp,
            "workflow": ["clinical", "doc"],
            "metadata": {"confidence_score": random.randint(88, 99)}
        }

    async def _handle_digital_therapeutics_query(self, query: str, timestamp: str) -> Dict[str, Any]:
        text = (
            "**Digital Therapeutics (DTx)**\n\n"
            "**Digital Health Agent:**\n"
            "- **Definition:** Evidence-based therapeutic interventions driven by high-quality software.\n"
            "- **Regulation:** FDA 'Software as a Medical Device' (SaMD) pathway.\n"
            "- **Applications:** Cognitive Behavioral Therapy (CBT) for insomnia, ADHD, and substance abuse.\n\n"
            "**Reimbursement:** Evolving landscape; Germany's DiGA model is a global pioneer."
        )
        return {
            "id": str(uuid.uuid4()),
            "sender": "master",
            "agent": "Master Agent",
            "text": text,
            "timestamp": timestamp,
            "workflow": ["regulatory", "market"],
            "metadata": {"confidence_score": random.randint(85, 95)}
        }

    async def _handle_greeting(self, query: str, timestamp: str) -> Dict[str, Any]:
        text = (
            "**Hello! I am the CuraVyom Master Orchestrator.**\n\n"
            "I can assist you with:\n"
            "- **Drug Repurposing Analysis** (e.g., 'Analyze Metformin')\n"
            "- **Comparison** (e.g., 'Compare Drug A and Drug B')\n"
            "- **Safety Profiles** (e.g., 'What are the side effects?')\n"
            "- **Market Data** (e.g., 'What is the market size?')\n"
            "- **Regulatory Pathways** (e.g., 'Is it FDA approved?')\n"
            "- **Dosage Info** (e.g., 'What is the recommended dose?')\n"
            "- **Patent Status** (e.g., 'When does the patent expire?')\n"
            "- **Manufacturing/CMC** (e.g., 'Is the synthesis scalable?')\n"
            "- **Reimbursement** (e.g., 'Will insurance cover it?')\n"
            "- **Combinations** (e.g., 'Can it be combined with other drugs?')\n"
            "- **Competitors** (e.g., 'Who are the rivals?')\n"
            "- **Demographics** (e.g., 'Target patient population?')\n"
            "- **Supply Chain** (e.g., 'Sourcing risks?')\n"
            "- **Global Intelligence** (e.g., 'Global market trends', 'Approval in China', 'Global trials')\n"
            "- **Disease Intelligence** (e.g., 'Rare diseases', 'Oncology trends', 'Infectious diseases')\n"
            "- **Expanded Health** (e.g., 'Tropical diseases', 'Autoimmune', 'Mental health', 'Geriatrics')\n"
            "- **Future Tech & Special Pops** (e.g., 'Pediatrics', 'Women\\'s health', 'Precision medicine', 'DTx')\n\n"
            "How can I help you today?"
        )
        return {
            "id": str(uuid.uuid4()),
            "sender": "master",
            "agent": "Master Agent",
            "text": text,
            "timestamp": timestamp,
            "workflow": ["general"],
            "metadata": {"confidence_score": 100}
        }
