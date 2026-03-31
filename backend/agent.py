from langgraph.graph import StateGraph, END
from typing import TypedDict
import json
import re

from tools import (
    log_interaction,
    edit_interaction,
    summarize_interaction,
    suggest_followup,
    detect_sentiment,
)

# ✅ State Definition
class AgentState(TypedDict):
    message: str
    response: dict


# ✅ Safe JSON Parser (VERY IMPORTANT)
def safe_json(text):
    try:
        return json.loads(text)
    except:
        # Extract JSON from LLM response
        match = re.search(r"\{.*\}", text, re.DOTALL)
        if match:
            try:
                return json.loads(match.group())
            except:
                return {}
        return {}


# ✅ Router (decides which tool to call)
def router(state: AgentState):
    msg = state["message"].lower()

    if "change" in msg or "sorry" in msg or "update" in msg:
        return "edit"
    elif "follow" in msg:
        return "followup"
    elif "summary" in msg:
        return "summary"
    elif "sentiment" in msg:
        return "sentiment"
    else:
        return "log"


# ✅ Tool Nodes
def log_node(state: AgentState):
    res = log_interaction.invoke(state["message"])
    return {
        "response": {
            "tool": "log_interaction",
            "data": safe_json(res),
        }
    }


def edit_node(state: AgentState):
    res = edit_interaction.invoke(state["message"])
    return {
        "response": {
            "tool": "edit_interaction",
            "data": safe_json(res),
        }
    }


def summary_node(state: AgentState):
    res = summarize_interaction.invoke(state["message"])
    return {
        "response": {
            "tool": "summary",
            "data": {"topics": res},
        }
    }


def followup_node(state: AgentState):
    res = suggest_followup.invoke(state["message"])
    return {
        "response": {
            "tool": "followup",
            "data": {"follow_up": res},
        }
    }


def sentiment_node(state: AgentState):
    res = detect_sentiment.invoke(state["message"])
    return {
        "response": {
            "tool": "sentiment",
            "data": {"sentiment": res.strip().lower()},
        }
    }


# ✅ Build LangGraph
def build_graph():
    graph = StateGraph(AgentState)

    graph.add_node("log", log_node)
    graph.add_node("edit", edit_node)
    graph.add_node("summary", summary_node)
    graph.add_node("followup", followup_node)
    graph.add_node("sentiment", sentiment_node)

    # Dynamic routing
    graph.set_conditional_entry_point(router)

    graph.add_edge("log", END)
    graph.add_edge("edit", END)
    graph.add_edge("summary", END)
    graph.add_edge("followup", END)
    graph.add_edge("sentiment", END)

    return graph.compile()


# ✅ Initialize Graph
graph = build_graph()


# ✅ Main function used in FastAPI
def run_agent(message: str):
    result = graph.invoke({"message": message})
    return result["response"]