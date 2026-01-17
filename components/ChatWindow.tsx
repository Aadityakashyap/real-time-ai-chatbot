"use client";

import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import { ChatMessage } from "@/lib/types";

const ChatWindow = ({
  messages,
  onCopy,
}: {
  messages: ChatMessage[];
  onCopy: (id: string) => void;
}) => {
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({
      top: listRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <section
      ref={listRef}
      className="flex-1 overflow-y-auto bg-bg-soft px-3 py-4 md:px-6"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-2">
        {messages.map((m) => (
          <MessageBubble key={m.id} m={m} onCopy={onCopy} />
        ))}
      </div>
    </section>
  );
};

export default ChatWindow;
