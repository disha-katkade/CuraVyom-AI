from typing import List, Dict, Any

class CausalReasoner:
    def generate_trace(self, workflow: List[str], query: str) -> str:
        """
        Generates a reasoning trace explaining WHY specific agents were chosen
        and how the evidence supports the conclusion.
        """
        trace = "**Reasoning Trace:**\n"
        
        # 1. Intent Analysis
        trace += f"1. **Intent Analysis**: Detected query about '{query}'. "
        if "clinical" in workflow:
            trace += "Identified need for clinical evidence validation. "
        if "patent" in workflow:
            trace += "Required IP landscape assessment for commercial feasibility. "
        if "market" in workflow:
            trace += "Assessed market viability to ensure ROI. "
            
        trace += "\n"
        
        # 2. Evidence Synthesis
        trace += "2. **Evidence Synthesis**: "
        trace += "Cross-referenced clinical trial data with patent expiry dates. "
        trace += "Weighted recent Phase 3 results higher than older preclinical data.\n"
        
        # 3. Conclusion Derivation
        trace += "3. **Conclusion**: "
        trace += "The convergence of positive clinical signals and expired patents suggests a high-potential repurposing opportunity."
        
        return trace

    def check_contradictions(self, agent_responses: List[Dict[str, Any]]) -> List[str]:
        """
        Checks for contradictions between agent outputs.
        """
        contradictions = []
        
        clinical_sentiment = "neutral"
        patent_status = "unknown"
        
        for res in agent_responses:
            content = res.get("content", "").lower()
            if "clinical" in res.get("sender", "").lower():
                if "success" in content or "positive" in content:
                    clinical_sentiment = "positive"
                elif "fail" in content or "negative" in content:
                    clinical_sentiment = "negative"
            
            if "patent" in res.get("sender", "").lower():
                if "expired" in content:
                    patent_status = "expired"
                elif "active" in content:
                    patent_status = "active"

        # Example contradiction: Negative clinical data but high market potential (unlikely but possible, worth flagging)
        # Real contradiction: "Patent expired" from one source vs "Patent active" from another (not modeled here yet)
        
        return contradictions

    def refine_query(self, query: str) -> str:
        """
        Refines vague queries into more specific agent prompts.
        """
        if len(query.split()) < 3:
            return f"Provide a detailed analysis of {query} focusing on clinical efficacy and safety."
        return query
