# Real-Time AI Chatbot

A responsive AI chat with streaming via WebSockets. Built with Next.js, TypeScript, and Tailwind CSS. UI has sticky composer and dark/light themes.

## Features

- [x] Chat UI with user/AI bubbles, timestamps
- [x] Enter to send, send button
- [x] Character limit indicator
- [x] WebSocket connection with status + auto-reconnect
- [x] Streaming AI responses (token/chunk)
- [x] Typing indicator animation
- [x] Message persistence (localStorage)
- [x] Clear chat
- [x] Copy message to clipboard
- [x] Markdown rendering in responses
- [x] Dark/light theme toggle
- [x] Responsive Design

## Tech stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Native WebSocket client
- `ws` server (Node)
- `react-markdown` + `remark-gfm`

## Getting started

### 1. Clone the repo:

```bash
git clone real-time-ai-chatbot
cd real-time-ai-chatbot
```

### 2. Environment

```bash
cp .env.example .env
# edit WS_HOST, WS_PORT, WS_SECURE
# add GEMINI_API_KEY
```

### 3. Install dependencies and run:

```bash
npm install
npm run dev
npm run ws
```

Visit `http://localhost:3000`

## Deployment

### 1. Deploy WebSocket

- Deploy the WebSocket server separately (e.g., on Render, or a VM).
- If using Gemini, set `GEMINI_API_KEY` on the WS server only.

### 2. Deploy to Vercel (Next.js Frontend)

- Push your repo to GitHub.
- Go to Vercel → Import Project.
- Select your repo, configure environment variables.
- Set `NEXT_PUBLIC_WS_HOST`, `NEXT_PUBLIC_WS_PORT`, `NEXT_PUBLIC_WS_SECURE` in the frontend environment to point to your WS server.
- Deploy.

### 3. Verify Deployment

Visit your Vercel your domain and test AI Chatbot.

## Time spent

- ~4–5 hours (design implementation, polish, README)
- ~6–7 hours (WebSocket implementation, test)
