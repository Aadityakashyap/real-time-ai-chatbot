import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const Markdown: React.FC<{ text: string }> = ({ text }) => (
  <ReactMarkdown
    remarkPlugins={[remarkGfm]}
    components={{
      code: ({ children }) => (
        <code className="rounded bg-muted px-1 py-0.5 text-[0.95em]">
          {children}
        </code>
      ),
      a: ({ children, href }) => (
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="text-accent underline"
        >
          {children}
        </a>
      ),
      ul: ({ children }) => (
        <ul className="ml-5 list-disc space-y-1">{children}</ul>
      ),
      ol: ({ children }) => (
        <ol className="ml-5 list-decimal space-y-1">{children}</ol>
      ),
    }}
  >
    {text}
  </ReactMarkdown>
);
