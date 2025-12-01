import asyncio
import random
from typing import List, Dict, Any

class MockTools:
    @staticmethod
    async def search_clinical_trials(query: str) -> Dict[str, Any]:
        """Simulates searching ClinicalTrials.gov"""
        await asyncio.sleep(0.5)
        return {
            "source": "ClinicalTrials.gov",
            "count": 45,
            "top_studies": [
                {"id": "NCT01234567", "title": f"Efficacy of {query} in Alzheimer's", "status": "Completed"},
                {"id": "NCT07654321", "title": f"Phase 2 Study of {query} for Neuroinflammation", "status": "Recruiting"}
            ],
            "biomarker": "BDNF"
        }

    @staticmethod
    async def search_patents(query: str) -> Dict[str, Any]:
        """Simulates searching USPTO/Lens.org"""
        await asyncio.sleep(0.5)
        return {
            "source": "USPTO",
            "count": 12,
            "freedom_to_operate": "High",
            "expiry_dates": ["2028-05-12", "2030-11-01"]
        }

    @staticmethod
    async def search_market_data(query: str) -> Dict[str, Any]:
        """Simulates market research API"""
        await asyncio.sleep(0.5)
        return {
            "cagr": "12.5%",
            "peak_sales": "$1.2B",
            "competitors": ["CompetitorA", "CompetitorB"]
        }

    @staticmethod
    async def check_regulatory_guidelines(query: str) -> Dict[str, Any]:
        """Simulates FDA/EMA guideline retrieval"""
        await asyncio.sleep(0.5)
        return {
            "pathway": "505(b)(2)",
            "risk_level": "Low",
            "precedents": ["DrugX", "DrugY"]
        }

    @staticmethod
    async def web_search(query: str) -> List[str]:
        """Simulates generic web search"""
        await asyncio.sleep(0.5)
        return [
            f"Recent Phase 3 clinical trial results published in Nature Medicine demonstrate significant efficacy for {query.split(' ')[-1] if ' ' in query else query} in target indication.",
            "Leading industry analysts project strong market uptake due to unmet medical need.",
            "Patent landscape analysis suggests clear freedom to operate in major markets."
        ]
