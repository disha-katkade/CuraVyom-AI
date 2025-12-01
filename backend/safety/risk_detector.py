from typing import List, Dict, Any

class RiskDetector:
    def __init__(self):
        self.risk_keywords = {
            "safety": ["toxic", "adverse event", "side effect", "death", "fatal"],
            "legal": ["litigation", "lawsuit", "infringement", "patent dispute"],
            "market": ["recall", "withdrawn", "saturation", "competitor dominance"]
        }

    def assess_risk(self, text: str) -> Dict[str, Any]:
        """
        Scans text for risk-related keywords and categorizes them.
        """
        risks = []
        text_lower = text.lower()
        
        for category, keywords in self.risk_keywords.items():
            for keyword in keywords:
                if keyword in text_lower:
                    risks.append({
                        "category": category,
                        "keyword": keyword,
                        "severity": "High" if category == "safety" else "Medium"
                    })
        
        return {
            "has_risks": len(risks) > 0,
            "risks": risks,
            "summary": f"Detected {len(risks)} potential risk factors." if risks else "No significant risks detected."
        }
