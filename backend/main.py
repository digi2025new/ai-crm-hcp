from fastapi import FastAPI
from pydantic import BaseModel
from agent import run_agent
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str


@app.post("/chat")
def chat(req: ChatRequest):
    result = run_agent(req.message)

    return {
        "message": "AI processed your request",
        "tool": result["tool"],
        "data": result["data"],
    }