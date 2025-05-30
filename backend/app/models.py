from pydantic import BaseModel
from typing import List, Optional

class ProjectDetails(BaseModel):
    client_name: str
    industry: str
    timeline: str
    tech_stack: List[str]
    budget: Optional[float]
    description: Optional[str]

class ProposalRequest(BaseModel):
    project_details: ProjectDetails
    format: str  # "pdf" or "docx" 