import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv(dotenv_path=".env")

# Get API Key
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

# Debug (for testing only)
if not GROQ_API_KEY:
    raise ValueError("❌ GROQ_API_KEY is not set. Check your .env file.")
else:
    print("✅ GROQ API Key Loaded Successfully")