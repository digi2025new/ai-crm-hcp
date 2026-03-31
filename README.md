# 🤖 AI CRM Interaction Assistant

## 📌 Overview

This project is an AI-powered CRM assistant that allows users to log and manage interaction details using natural language.

The system uses **LangGraph + LLM (Groq)** to extract structured data and automatically populate a CRM form.

---

## 🚀 Features

* AI-powered interaction logging
* Edit interaction using natural language
* Automatic form filling (no manual input)
* 5 LangGraph tools:

  * Log Interaction
  * Edit Interaction
  * Summarize Interaction
  * Suggest Follow-up
  * Detect Sentiment

---

## 🧠 Tech Stack

### Frontend

* React.js
* Redux Toolkit
* Tailwind CSS

### Backend

* FastAPI
* LangGraph
* LangChain
* Groq LLM (LLaMA 3.3)

---

## 🔄 How It Works

1. User enters message in chat panel
2. LangGraph routes the request to the correct tool
3. LLM extracts structured CRM data
4. Backend sends JSON response
5. Redux updates form automatically

---

## 🖥️ Setup Instructions

### 1. Clone Repo

```bash
git clone https://github.com/your-username/ai-crm-hcp.git
cd ai-crm-hcp
```

---

### 2. Backend Setup

```bash
cd backend
python -m venv venv
venv\Scripts\activate   # Windows

pip install -r requirements.txt
```

Create `.env` file:

```
GROQ_API_KEY=your_api_key_here
```

Run backend:

```bash
uvicorn main:app --reload
```

---

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🧪 Example Usage

### Input:

```
Today I met Dr Smith and discussed product X. It was positive and I shared brochures.
```

### Output:

* HCP Name → Dr Smith
* Sentiment → Positive
* Materials → Brochures

---

## 📌 Important Notes

* Form cannot be edited manually
* All updates are controlled via AI assistant
* Uses LangGraph (no hardcoded logic)

---

## 🎯 Conclusion

This project demonstrates how AI agents can automate CRM workflows using natural language processing and tool-based architectures.

---
