export type Role = "user" | "assistant" | "system";

export interface ChatMessage {
  id: string;
  role: Role;
  content: string;
  ts: number;
  streaming?: boolean;
}

export interface WSOutbound {
  type: "user_message" | "clear" | "ping";
  payload?: { text?: string };
}

export interface WSInbound {
  type: "stream_start" | "stream_chunk" | "stream_end" | "error" | "status";
  payload?: {
    text?: string;
    status?: "connected" | "disconnected" | "reconnecting";
  };
}
