import { ChatMessage } from "./types";

const KEY = "ai-chatbot-messages";

export const loadMessages = (): ChatMessage[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const saveMessages = (msgs: ChatMessage[]) => {
  try {
    localStorage.setItem(KEY, JSON.stringify(msgs));
  } catch {}
};

export const clearMessages = () => {
  try {
    localStorage.removeItem(KEY);
  } catch {}
};
