import { Switch } from "@headlessui/react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";
import { cn } from "../../lib/utils";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <Switch
      checked={isDark}
      onChange={toggleTheme}
      className={cn(
        "relative inline-flex h-9 w-16 items-center rounded-full border-2 transition-colors focus:outline-none focus:ring-0 focus:ring-offset-0",
        isDark ? "bg-accent" : "bg-muted"
      )}
      style={{
        borderColor: isDark ? 'hsla(0, 0%, 60%, 0.5)' : 'hsl(var(--border))',
        borderWidth: '2px'
      }}
      aria-label="Toggle theme"
    >
      <span className="sr-only">Toggle theme</span>
      <span
        className={cn(
          "inline-block h-7 w-7 transform rounded-full border-2 transition-transform flex items-center justify-center",
          isDark ? "translate-x-8" : "translate-x-1 bg-background"
        )}
        style={{
          borderColor: isDark ? 'hsla(0, 0%, 60%, 0.5)' : 'hsl(var(--border))',
          backgroundColor: isDark ? 'hsl(0, 0%, 30%)' : undefined,
          borderWidth: '2px'
        }}
      >
        {isDark ? (
          <Moon className="h-3.5 w-3.5 text-foreground" />
        ) : (
          <Sun className="h-3.5 w-3.5 text-foreground" />
        )}
      </span>
    </Switch>
  );
};

