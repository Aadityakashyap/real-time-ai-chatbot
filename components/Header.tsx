import Image from "next/image";
import ThemeToggle from "./ThemeToggle";

const Header = ({
  status,
  total,
  mode,
  setMode,
  onClear,
}: {
  status: string;
  total: number;
  mode: "dark" | "light";
  setMode: (m: "dark" | "light") => void;
  onClear: () => void;
}) => {
  return (
    <header className="sticky top-0 z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-bg-elev bg-bg-soft px-4 py-2 gap-4 backdrop-blur select-none 2xl:max-w-6xl 2xl:mx-auto w-full">
      <div className="flex items-center gap-3 cursor-default">
        <Image
          className="h-10 w-auto"
          src="/logo.svg"
          alt="Logo"
          width={40}
          height={40}
        />
        <h1 className="font-semibold text-lg">AI CHAT</h1>
      </div>

      <div className="flex items-center gap-3 flex-wrap cursor-default">
        <ThemeToggle mode={mode} setMode={setMode} />
        <div
          className={`flex items-center gap-2 text-sm text-muted px-3 py-2 border rounded-lg ${status === "connected" ? "border-accent" : status === "reconnecting" ? "border-yellow-400" : "border-danger"}`}
        >
          <span
            className={`h-2 w-2 rounded-full ${status === "connected" ? "bg-accent" : status === "reconnecting" ? "bg-yellow-400" : "bg-danger"}`}
          />
          <span
            className={`${status === "connected" ? "text-accent" : status === "reconnecting" ? "text-yellow-400" : "text-danger"}`}
          >
            {status}
          </span>
        </div>
        <div className="group">
          <div className="text-xs text-muted px-3.5 py-2.5 border rounded-lg border-muted group-hover:hidden">
            {total} messages
          </div>
          <button
            onClick={onClear}
            className="text-xs text-muted px-3.5 py-2.5 border rounded-lg border-muted hidden group-hover:inline"
          >
            Clear Chat
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
