import { WebSocketServer } from "ws";
import { streamGemini, streamMock } from "./llm.ts";

const host = process.env.WS_HOST || "localhost";
const port = Number(process.env.WS_PORT || 8080);
const apiKey = process.env.GEMINI_API_KEY || "";

const wss = new WebSocketServer({ host, port });

wss.on("connection", (ws) => {
  ws.send(JSON.stringify({ type: "status", payload: { status: "connected" } }));

  ws.on("message", async (raw) => {
    try {
      const msg = JSON.parse(String(raw));
      if (msg.type === "user_message") {
        const text = msg?.payload?.text || "";
        if (apiKey) {
          await streamGemini(ws, text, apiKey);
        } else {
          await streamMock(ws, text);
        }
      } else if (msg.type === "ping") {
        ws.send(
          JSON.stringify({ type: "status", payload: { status: "connected" } }),
        );
      }
    } catch (e: any) {
      ws.send(
        JSON.stringify({
          type: "error",
          payload: { text: e?.message || "Invalid message" },
        }),
      );
    }
  });
});

wss.on("listening", () => {
  console.log(`WS listening on ws://${host}:${port}`);
});

wss.on("error", (err) => {
  console.error("WS error:", err);
});
