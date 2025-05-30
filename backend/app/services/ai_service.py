import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()

# Configure Gemini
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

class AIService:
    def __init__(self):
        self.model = genai.GenerativeModel('gemini-pro')
        self.vision_model = genai.GenerativeModel('gemini-pro-vision')

    async def generate_proposal_content(self, project_details: dict) -> str:
        prompt = self._create_prompt(project_details)
        response = await self.model.generate_content(prompt)
        return response.text

    async def generate_diagram_description(self, diagram_type: str, context: dict) -> str:
        prompt = self._create_diagram_prompt(diagram_type, context)
        response = await self.model.generate_content(prompt)
        return response.text

    def _create_prompt(self, project_details: dict) -> str:
        return f"""
        Create a comprehensive Software Requirements Specification (SRS) document for the following project:
        
        Project Name: {project_details.get('project_name')}
        Client: {project_details.get('client_name')}
        Industry: {project_details.get('industry')}
        Technical Stack: {project_details.get('tech_stack')}
        Database Requirements: {project_details.get('database_requirements')}
        API Requirements: {project_details.get('api_requirements')}
        Security Requirements: {project_details.get('security_requirements')}
        System Architecture: {project_details.get('architecture')}
        
        Include the following sections:
        1. Project Overview
        2. System Requirements
        3. Functional Requirements
        4. Non-Functional Requirements
        5. Technical Architecture
        6. Database Design
        7. API Specifications
        8. Security Measures
        9. Timeline and Milestones
        10. Cost Estimation
        """

    def _create_diagram_prompt(self, diagram_type: str, context: dict) -> str:
        return f"""
        Create a detailed description for a {diagram_type} diagram for the following project context:
        
        Project Name: {context.get('project_name')}
        Technical Stack: {context.get('tech_stack')}
        Architecture: {context.get('architecture')}
        
        The description should be in a format that can be used to generate a {diagram_type} diagram.
        Include all necessary components, relationships, and flows.
        """ 