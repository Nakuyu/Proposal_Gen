from pydantic import BaseModel
from typing import List, Optional, Dict

class TechnicalStack(BaseModel):
    frontend: List[str]
    backend: List[str]
    database: List[str]
    devops: List[str]
    other: Optional[List[str]]

class DatabaseRequirements(BaseModel):
    type: str  # SQL, NoSQL, etc.
    scaling_requirements: Optional[str]
    backup_requirements: Optional[str]
    security_requirements: Optional[str]
    specific_requirements: Optional[List[str]]

class APIRequirements(BaseModel):
    authentication_type: str  # JWT, OAuth, etc.
    rate_limiting: Optional[bool]
    versioning: Optional[bool]
    documentation_requirements: Optional[str]
    specific_endpoints: Optional[List[str]]

class SecurityRequirements(BaseModel):
    authentication: List[str]
    authorization: List[str]
    data_encryption: List[str]
    compliance_requirements: Optional[List[str]]
    specific_security_measures: Optional[List[str]]

class SystemArchitecture(BaseModel):
    architecture_type: str  # Monolithic, Microservices, etc.
    deployment_strategy: Optional[str]
    scaling_strategy: Optional[str]
    specific_requirements: Optional[List[str]]

class ProjectDetails(BaseModel):
    project_name: str
    client_name: str
    industry: str
    timeline: str
    budget: Optional[float]
    description: Optional[str]
    technical_stack: TechnicalStack
    database_requirements: DatabaseRequirements
    api_requirements: APIRequirements
    security_requirements: SecurityRequirements
    system_architecture: SystemArchitecture

class ProposalRequest(BaseModel):
    project_details: ProjectDetails
    format: str  # "pdf" or "docx"
    include_diagrams: bool = True
    diagram_types: Optional[List[str]] = ["workflow", "database", "class", "activity"] 