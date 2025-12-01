import asyncio
import random
from typing import Dict, Any
from backend.agents.base import BaseAgent
from backend.models.messages import AgentMessage
from backend.tools.mock_apis import MockTools
from backend.tools.rag import RAGSystem

class ClinicalAgent(BaseAgent):
    def __init__(self):
        super().__init__(name="Clinical Agent", role="Clinical Trials Analyst")

    async def process(self, message: AgentMessage) -> AgentMessage:
        data = await MockTools.search_clinical_trials(message.content)
        return AgentMessage(
            id=str(random.randint(10000, 99999)),
            sender=self.name,
            recipient=message.sender,
            content=f"Analyzed clinical data for '{message.content}'. Found {data['count']} relevant studies from {data['source']}. Key biomarker: {data['biomarker']}.",
            message_type="response",
            metadata=data
        )

class PatentAgent(BaseAgent):
    def __init__(self):
        super().__init__(name="Patent Agent", role="IP Analyst")

    async def process(self, message: AgentMessage) -> AgentMessage:
        data = await MockTools.search_patents(message.content)
        return AgentMessage(
            id=str(random.randint(10000, 99999)),
            sender=self.name,
            recipient=message.sender,
            content=f"Conducted IP landscape analysis. {data['count']} active patents found via {data['source']}. Freedom to operate: {data['freedom_to_operate']}.",
            message_type="response",
            metadata=data
        )

class MarketAgent(BaseAgent):
    def __init__(self):
        super().__init__(name="Market Agent", role="Market Researcher")

    async def process(self, message: AgentMessage) -> AgentMessage:
        data = await MockTools.search_market_data(message.content)
        return AgentMessage(
            id=str(random.randint(10000, 99999)),
            sender=self.name,
            recipient=message.sender,
            content=f"Market analysis: Global CAGR {data['cagr']}. Estimated peak sales: {data['peak_sales']}. Key competitors: {', '.join(data['competitors'])}.",
            message_type="response",
            metadata=data
        )

class RegulatoryAgent(BaseAgent):
    def __init__(self):
        super().__init__(name="Regulatory Agent", role="Compliance Officer")

    async def process(self, message: AgentMessage) -> AgentMessage:
        data = await MockTools.check_regulatory_guidelines(message.content)
        return AgentMessage(
            id=str(random.randint(10000, 99999)),
            sender=self.name,
            recipient=message.sender,
            content=f"Regulatory pathway: {data['pathway']}. Risk level: {data['risk_level']}. Precedents: {', '.join(data['precedents'])}.",
            message_type="response",
            metadata=data
        )

class DocAgent(BaseAgent):
    def __init__(self):
        super().__init__(name="Internal Doc Agent", role="RAG Specialist")
        self.rag = RAGSystem()

    async def process(self, message: AgentMessage) -> AgentMessage:
        docs = await self.rag.retrieve(message.content)
        summary = " ".join([d['content'] for d in docs])
        return AgentMessage(
            id=str(random.randint(10000, 99999)),
            sender=self.name,
            recipient=message.sender,
            content=f"Retrieved {len(docs)} internal documents. Summary: {summary}",
            message_type="response",
            metadata={"documents": docs}
        )

class SearchAgent(BaseAgent):
    def __init__(self):
        super().__init__(name="Web Search Agent", role="Information Specialist")

    async def process(self, message: AgentMessage) -> AgentMessage:
        results = await MockTools.web_search(message.content)
        return AgentMessage(
            id=str(random.randint(10000, 99999)),
            sender=self.name,
            recipient=message.sender,
            content=f"Web search results: {results[0]}",
            message_type="response",
            metadata={"results": results}
        )
