from abc import ABC, abstractmethod
from typing import Dict, Any, List
from backend.models.messages import AgentMessage

class BaseAgent(ABC):
    def __init__(self, name: str, role: str):
        self.name = name
        self.role = role
        self.memory: List[AgentMessage] = []

    @abstractmethod
    async def process(self, message: AgentMessage) -> AgentMessage:
        """Process an incoming message and return a response."""
        pass

    def log(self, content: str) -> AgentMessage:
        """Create a log message."""
        import uuid
        return AgentMessage(
            id=str(uuid.uuid4()),
            sender=self.name,
            recipient="System",
            content=content,
            message_type="log"
        )
