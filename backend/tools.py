from langchain_core.tools import tool
from langchain_core.prompts import ChatPromptTemplate
from langchain_groq import ChatGroq
from config import GROQ_API_KEY

# Initialize LLM
llm = ChatGroq(
    api_key=GROQ_API_KEY,
    model="llama-3.3-70b-versatile"
)

# ✅ 1. Log Interaction Tool
@tool
def log_interaction(text: str):
    """Extract structured CRM interaction data from user input."""

    prompt = ChatPromptTemplate.from_template("""
    Extract structured CRM interaction data from this text:
    {text}

    STRICT RULES:
    - Return ONLY valid JSON
    - No explanation
    - No text before or after JSON

    JSON FORMAT:
    {{
        "hcp_name": "",
        "date": "",
        "time": "",
        "interaction_type": "",
        "attendees": "",
        "topics": "",
        "materials_shared": "",
        "samples": "",
        "sentiment": "",
        "outcomes": "",
        "follow_up": ""
    }}
    """)

    res = (prompt | llm).invoke({"text": text})
    return res.content.strip()


# ✅ 2. Edit Interaction Tool
@tool
def edit_interaction(text: str):
    """Update only specific fields in existing CRM interaction."""

    prompt = ChatPromptTemplate.from_template("""
    Extract ONLY fields that need to be updated from:
    {text}

    STRICT RULES:
    - Return ONLY valid JSON
    - Include ONLY changed fields
    - No explanation

    Example:
    {{
        "hcp_name": "Dr John",
        "sentiment": "negative"
    }}
    """)

    res = (prompt | llm).invoke({"text": text})
    return res.content.strip()


# ✅ 3. Summarize Tool
@tool
def summarize_interaction(text: str):
    """Summarize interaction into short CRM-friendly text."""
    
    prompt = ChatPromptTemplate.from_template("""
    Summarize this interaction briefly:
    {text}
    """)

    return (prompt | llm).invoke({"text": text}).content


# ✅ 4. Follow-up Tool
@tool
def suggest_followup(text: str):
    """Suggest follow-up actions based on interaction."""
    
    prompt = ChatPromptTemplate.from_template("""
    Suggest follow-up actions:
    {text}
    """)

    return (prompt | llm).invoke({"text": text}).content


# ✅ 5. Sentiment Tool
@tool
def detect_sentiment(text: str):
    """Detect sentiment: positive, neutral, or negative."""
    
    prompt = ChatPromptTemplate.from_template("""
    Detect sentiment (positive, neutral, negative):
    {text}
    Return only one word.
    """)

    return (prompt | llm).invoke({"text": text}).content