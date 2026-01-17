const ThemeToggle = ({
  mode,
  setMode,
}: {
  mode: "dark" | "light";
  setMode: (m: "dark" | "light") => void;
}) => {
  return (
    <div aria-label="Theme toggle">
      <button
        id="toggleTheme"
        className="flex h-10 w-10 items-center justify-center rounded-full bg-bg-elev transition hover:shadow-md cursor-pointer"
        aria-pressed={mode === "dark"}
        aria-label="Toggle theme"
        onClick={() => setMode(mode === "dark" ? "light" : "dark")}
      >
        <span className="" aria-hidden="true">
          {mode === "dark" ? "🌙" : "☀️"}
        </span>
      </button>
    </div>
  );
};

export default ThemeToggle;
