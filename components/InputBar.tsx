"use client";

import { useEffect, useRef, useState } from "react";
import { theme } from "@/lib/theme";

const InputBar = ({
  disabled,
  onSend,
}: {
  disabled: boolean;
  onSend: (text: string) => void;
}) => {
  const [text, setText] = useState("");
  const [chars, setChars] = useState(0);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => setChars(text.length), [text]);

  const submit = () => {
    if (!text.trim() || disabled) return;
    onSend(text.trim());
    setText("");
    inputRef.current?.focus();
  };

  return (
    <div className="sticky bottom-0 z-10 border-t border-bg-elev bg-bg-soft p-3 md:p-4 2xl:max-w-6xl 2xl:mx-auto w-full">
      <div className="mx-auto flex max-w-5xl items-center justify-center gap-2 flex-col sm:flex-row">
        <div className="flex-1 w-full relative">
          <textarea
            ref={inputRef}
            value={text}
            onChange={(e) => setText(e.target.value.slice(0, theme.maxChars))}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                submit();
              }
            }}
            disabled={disabled}
            placeholder={disabled ? "AI is responding..." : "Type a message"}
            className="neu-inset h-12 flex-1 resize-none rounded-md bg-surface px-3 py-2 text-sm outline-none placeholder:text-muted w-full focus:ring-2 focus:ring-accent"
          />
          <span
            className={`absolute bottom-2 right-2 text-[10px] pointer-events-none ${
              chars > theme.maxChars * 0.9 ? "text-yellow-400" : "text-muted"
            }`}
          >
            {chars}/{theme.maxChars}
          </span>
        </div>
        <div className="flex items-center justify-center">
          <button
            onClick={submit}
            disabled={disabled}
            className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-black hover:brightness-110 disabled:opacity-50 transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default InputBar;
