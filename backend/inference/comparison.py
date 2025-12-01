from typing import List, Dict, Any

class MoleculeComparator:
    def compare(self, candidates: List[Dict[str, Any]]) -> Dict[str, Any]:
        """
        Compares multiple drug candidates based on key metrics.
        Expected candidate structure:
        {
            "name": "DrugA",
            "score": 85.5,
            "clinical_count": 45,
            "patent_status": "Expired",
            "market_potential": "$1.2B"
        }
        """
        if not candidates:
            return {"error": "No candidates provided for comparison."}

        # Sort by score descending
        sorted_candidates = sorted(candidates, key=lambda x: x.get("score", 0), reverse=True)
        
        winner = sorted_candidates[0]
        
        comparison_summary = f"Top candidate is {winner['name']} with a score of {winner.get('score', 0)}."
        
        # Generate pairwise insights
        insights = []
        for i in range(len(sorted_candidates) - 1):
            c1 = sorted_candidates[i]
            c2 = sorted_candidates[i+1]
            diff = c1.get("score", 0) - c2.get("score", 0)
            insights.append(f"{c1['name']} outperforms {c2['name']} by {round(diff, 1)} points, primarily due to {self._get_advantage(c1, c2)}.")

        return {
            "ranked_list": sorted_candidates,
            "winner": winner,
            "summary": comparison_summary,
            "insights": insights
        }

    def _get_advantage(self, c1: Dict[str, Any], c2: Dict[str, Any]) -> str:
        """Determines the primary advantage of c1 over c2."""
        if c1.get("clinical_count", 0) > c2.get("clinical_count", 0):
            return "stronger clinical evidence"
        elif c1.get("patent_status") == "Expired" and c2.get("patent_status") != "Expired":
            return "better patent freedom"
        elif float(c1.get("market_potential", "$0").replace("$", "").replace("B", "")) > float(c2.get("market_potential", "$0").replace("$", "").replace("B", "")):
            return "higher market potential"
        else:
            return "overall balanced profile"
