import type { WebSocket } from "ws";
import { GoogleGenerativeAI } from "@google/generative-ai";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const streamMock = async (ws: WebSocket, prompt: string) => {
  ws.send(JSON.stringify({ type: "stream_start" }));
  const reply = `You said: ${prompt}
  This is a demo streaming response with markdown, lists, and code:
  - Real-time chunks
  - Auto-scroll
  - Copy to clipboard
  \`\`\`js
  "Hello from mock stream";
  \`\`\`
  Thanks for trying this!`;

  const words = reply.split(" ");
  let buffer = "";

  for (const word of words) {
    buffer += word + " ";
    if (buffer.split(" ").length > 8) {
      ws.send(
        JSON.stringify({ type: "stream_chunk", payload: { text: buffer } }),
      );
      buffer = "";
      await sleep(80);
    }
  }

  if (buffer.trim()) {
    ws.send(
      JSON.stringify({ type: "stream_chunk", payload: { text: buffer } }),
    );
  }

  ws.send(JSON.stringify({ type: "stream_end" }));
};

export const streamGemini = async (
  ws: WebSocket,
  prompt: string,
  apiKey: string,
) => {
  ws.send(JSON.stringify({ type: "stream_start" }));
  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const stream = await model.generateContentStream(prompt);

    for await (const chunk of stream.stream) {
      await sleep(40);
      const text = chunk.text();
      if (!text) continue;

      ws.send(JSON.stringify({ type: "stream_chunk", payload: { text } }));
    }

    ws.send(JSON.stringify({ type: "stream_end" }));
  } catch (e: any) {
    ws.send(
      JSON.stringify({
        type: "error",
        payload: { text: e?.message || "LLM error" },
      }),
    );
  }
};
