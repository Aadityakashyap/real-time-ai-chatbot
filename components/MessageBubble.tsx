import { ChatMessage } from "@/lib/types";
import TypingDots from "./TypingDots";
import { Markdown } from "./Markdown";

const MessageBubble = ({
  m,
  onCopy,
}: {
  m: ChatMessage;
  onCopy: (id: string) => void;
}) => {
  const isUser = m.role === "user";
  const bubbleColor = isUser
    ? "bg-[var(--color-accent-2)]"
    : "bg-[var(--color-bg-elev)]";
  const align = isUser ? "justify-end" : "justify-start";

  return (
    <div className={`bubble-enter flex ${align}`}>
      <div
        className={`max-w-[92%] rounded-lg px-3 py-2 text-sm ${bubbleColor} shadow-md`}
      >
        <div className="flex items-center justify-between gap-3">
          <span className="text-xs text-muted">
            {isUser ? "You" : m.role === "assistant" ? "AI" : "System"}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-muted">
              {new Date(m.ts).toLocaleTimeString()}
            </span>
            <button
              onClick={() => onCopy(m.id)}
              className="text-[10px] text-accent underline opacity-80 hover:opacity-100"
            >
              Copy
            </button>
          </div>
        </div>
        <div className="prose prose-invert max-w-none">
          {m.streaming ? <TypingDots /> : <Markdown text={m.content} />}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
