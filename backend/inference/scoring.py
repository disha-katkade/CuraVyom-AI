from typing import Dict, Any

class EvidenceScorer:
    def __init__(self):
        self.weights = {
            "clinical_relevance": 0.30,
            "source_credibility": 0.20,
            "patent_freedom": 0.25,
            "market_viability": 0.25
        }

    def calculate_score(self, data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Calculates a confidence score (0-100) based on weighted factors.
        Expected data keys:
        - clinical_count: int
        - patent_freedom: str ("High", "Medium", "Low")
        - market_cagr: float (percentage)
        - regulatory_risk: str ("Low", "Medium", "High")
        """
        
        score = 0.0
        details = {}

        # 1. Clinical Relevance (30%)
        # More studies = higher score, capped at 50 studies for max points
        clinical_score = min(data.get("clinical_count", 0) * 2, 100)
        score += clinical_score * self.weights["clinical_relevance"]
        details["clinical_contribution"] = clinical_score * self.weights["clinical_relevance"]

        # 2. Source Credibility (20%)
        # Placeholder: Assume high credibility for now if data exists
        credibility_score = 90 if data.get("clinical_count", 0) > 0 else 0
        score += credibility_score * self.weights["source_credibility"]
        details["credibility_contribution"] = credibility_score * self.weights["source_credibility"]

        # 3. Patent Freedom (25%)
        freedom = data.get("patent_freedom", "Low")
        patent_score = 100 if freedom == "High" else 50 if freedom == "Medium" else 10
        score += patent_score * self.weights["patent_freedom"]
        details["patent_contribution"] = patent_score * self.weights["patent_freedom"]

        # 4. Market Viability (25%)
        # Higher CAGR = higher score
        cagr = float(data.get("market_cagr", "0").replace("%", ""))
        market_score = min(cagr * 5, 100) # 20% CAGR = 100 score
        score += market_score * self.weights["market_viability"]
        details["market_contribution"] = market_score * self.weights["market_viability"]

        return {
            "total_score": round(score, 1),
            "confidence_level": "High" if score > 75 else "Medium" if score > 50 else "Low",
            "breakdown": details
        }
