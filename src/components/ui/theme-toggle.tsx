import { Sun, Moon } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      className="flex h-12 w-12 items-center justify-center text-foreground transition-opacity hover:opacity-60 focus:outline-none focus:ring-0 focus:ring-offset-0"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Moon className="h-5 w-5" />
      ) : (
        <Sun className="h-5 w-5" />
      )}
    </button>
  );
};

