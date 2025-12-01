import asyncio
from typing import List, Dict

class RAGSystem:
    def __init__(self):
        self.documents = [
            {"id": "doc1", "content": "Internal Lab Note 101: Metformin reduces tau phosphorylation in murine models."},
            {"id": "doc2", "content": "Confidential Memo: Intranasal delivery bypasses BBB effectively."},
            {"id": "doc3", "content": "Clinical Strategy 2025: Focus on neuroinflammation targets."}
        ]

    async def retrieve(self, query: str) -> List[Dict[str, str]]:
        """Simulates vector retrieval"""
        await asyncio.sleep(0.3)
        # Simple keyword matching for simulation
        results = [doc for doc in self.documents if any(word in doc['content'].lower() for word in query.lower().split())]
        
        if not results:
            return [self.documents[0]] # Return default if no match
            
        return results
