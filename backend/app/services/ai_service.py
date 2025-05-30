from openai import OpenAI
import os
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

class AIService:
    def __init__(self):
        self.client = client

    async def generate_proposal_content(self, project_details: dict) -> str:
        # TODO: Implement proposal generation logic
        pass 