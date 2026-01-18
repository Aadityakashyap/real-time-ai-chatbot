# Real-Time AI Chatbot WebSocket Server Deployment on Render

## Deployment

Render is a PaaS (Platform‑as‑a‑Service) that can host long‑running Node.js servers — perfect for your WebSocket backend. Unlike Vercel, Render supports persistent connections.

### 1. Files you need to push

Don’t need entire Next.js frontend here. For the WebSocket backend, only the `server folder` (and following supporting files):

#### Required files:

- `server/ws-server.ts` → entry point for WebSocket server
- `server/llm.ts` → Gemini + mock streaming logic
- `package.json` → dependencies (`ws`, `@google/generative-ai`, etc.) and start script
- `tsconfig.json` (for TypeScript)
- `.gitignore`
- `.env`

That’s it.

### 2. Prepare `package.json`

Make sure have a start script:

```json
{
  "name": "real-time-ai-chatbot-ws",
  "version": "1.0.0",
  "main": "server/ws-server.ts",
  "scripts": {
    "start": "node server/ws-server.ts"
  },
  "dependencies": {
    "ws": "^8.18.0",
    "@google/generative-ai": "^0.5.0",
  }
  "devDependencies": {
    "@types/node": "^20",
    "@types/ws": "^8.18.1",
    "typescript": "^5"
  }
}
```

### 3. Push to GitHub

- Create a new repo just for the WebSocket server.
- Add only the files listed above.
- Commit and push.

## 4. Create a Render service

1. Log in to Render.
2. Click New → Web Service.
3. Connect your GitHub repo.
4. Fill in:
   - Environment: Node
   - Start Command: `npm start`
5. Add environment variables under Settings → Environment:
   - `WS_HOST=0.0.0.0`
   - `WS_PORT=10000` (or use `$PORT` provided by Render)
   - `GEMINI_API_KEY=your_api_key_here`

```ts
const port = Number(process.env.PORT || 8080);
const host = "0.0.0.0";
const wss = new WebSocketServer({ port, host });
```

## 5. Deploy

- Render builds and runs server.
- We’ll get a public URL like:
  ```
  wss://your-app.onrender.com
  ```
- Use this in Vercel frontend `.env`:
  ```env
  NEXT_PUBLIC_WS_HOST=your-app.onrender.com
  NEXT_PUBLIC_WS_PORT=443
  NEXT_PUBLIC_WS_SECURE=true
  ```

## 6. Connect frontend (Vercel) → backend (Render)

- Next.js app on Vercel connects to the Render WebSocket server.
- Visit your Vercel domain and Test by sending a message and watching the response.
