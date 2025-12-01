from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any, Literal
from datetime import datetime

class AgentMessage(BaseModel):
    id: str = Field(..., description="Unique message ID")
    sender: str = Field(..., description="Name of the sending agent")
    recipient: str = Field(..., description="Name of the receiving agent")
    content: str = Field(..., description="Text content of the message")
    message_type: Literal["task", "response", "error", "log"] = "response"
    timestamp: str = Field(default_factory=lambda: datetime.now().strftime("%I:%M %p"))
    metadata: Optional[Dict[str, Any]] = {}

class AgentTask(BaseModel):
    task_id: str
    description: str
    assigned_to: str
    status: Literal["pending", "in_progress", "completed", "failed"] = "pending"
    result: Optional[Dict[str, Any]] = None

class WorkflowState(BaseModel):
    query: str
    tasks: List[AgentTask] = []
    messages: List[AgentMessage] = []
    final_report: Optional[str] = None
