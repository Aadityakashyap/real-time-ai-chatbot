"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useWebSocket } from "@/hooks/useWebSocket";
import { ChatMessage } from "@/lib/types";
import { clearMessages, loadMessages, saveMessages } from "@/lib/storage";
import ChatWindow from "@/components/ChatWindow";
import InputBar from "@/components/InputBar";
import Header from "@/components/Header";

const Home = () => {
  const { status, send, addListener } = useWebSocket();
  const [messages, setMessages] = useState<ChatMessage[]>(() => loadMessages());
  const [inputDisabled, setInputDisabled] = useState(false);
  const [themeMode, setThemeMode] = useState<"dark" | "light">("dark");
  const containerRef = useRef<HTMLDivElement>(null);
  const listenerAdded = useRef(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", themeMode);
  }, [themeMode]);

  useEffect(() => {
    saveMessages(messages);
  }, [messages]);

  useEffect(() => {
    if (listenerAdded.current) return;
    listenerAdded.current = true;

    addListener((data) => {
      if (data.type === "stream_start") {
        const id = crypto.randomUUID();
        setMessages((prev) => {
          const exists = prev.some(
            (m) => m.streaming && m.role === "assistant",
          );
          if (exists) return prev;
          return [
            ...prev,
            {
              id,
              role: "assistant",
              content: "",
              ts: Date.now(),
              streaming: true,
            },
          ];
        });
        setInputDisabled(true);
      } else if (data.type === "stream_chunk") {
        setMessages((prev) => {
          const last = [...prev];
          const idx = last.findIndex((m) => m.streaming);
          if (idx >= 0)
            last[idx] = {
              ...last[idx],
              content: (last[idx].content || "") + (data.payload?.text || ""),
            };
          return last;
        });
      } else if (data.type === "stream_end") {
        setMessages((prev) => {
          const last = [...prev];
          const idx = last.findIndex((m) => m.streaming);
          if (idx >= 0)
            last[idx] = { ...last[idx], streaming: false, ts: Date.now() };
          return last;
        });
        setInputDisabled(false);
      } else if (data.type === "error") {
        setMessages((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            role: "system",
            content: `${data.payload?.text || "An error occurred."}`,
            ts: Date.now(),
          },
        ]);
        setInputDisabled(false);
      }
    });
  }, [addListener]);

  const onSend = (text: string) => {
    const msg: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: text,
      ts: Date.now(),
    };
    setMessages((prev) => [...prev, msg]);
    send({ type: "user_message", payload: { text } });
  };

  const onClear = () => {
    clearMessages();
    setMessages([]);
    send({ type: "clear" });
  };

  const copyMessage = async (id: string) => {
    const m = messages.find((x) => x.id === id);
    if (!m) return;
    try {
      await navigator.clipboard.writeText(m.content);
    } catch {}
  };

  const stats = useMemo(
    () => ({
      total: messages.length,
      lastTs: messages.at(-1)?.ts ?? 0,
    }),
    [messages],
  );

  return (
    <div ref={containerRef} className="grid h-full w-full grid-cols-1">
      <main className="relative flex h-full flex-col bg-bg-soft">
        <Header
          status={status}
          total={stats.total}
          mode={themeMode}
          setMode={setThemeMode}
          onClear={onClear}
        />
        <ChatWindow messages={messages} onCopy={copyMessage} />
        <InputBar disabled={inputDisabled} onSend={onSend} />
      </main>
    </div>
  );
};

export default Home;
