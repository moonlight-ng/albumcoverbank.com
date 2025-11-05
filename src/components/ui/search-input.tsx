import React from "react";
import { Search, X } from "lucide-react";
import { Input } from "./input";
import { cn } from "../../lib/utils";
import { useTheme } from "../../hooks/useTheme";

export interface SearchInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> {
  value: string;
  onValueChange: (value: string) => void;
  onClear?: () => void;
  className?: string;
}

export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ value, onValueChange, onClear, className, disabled, ...props }, ref) => {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    
    const handleClear = () => {
      onValueChange("");
      onClear?.();
    };

    return (
      <div className={cn("relative flex-1", className)}>
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none z-10" />
        <Input
          ref={ref}
          type="text"
          value={value}
          onChange={(e) => onValueChange(e.target.value)}
          disabled={disabled}
          className={cn(
            "pl-9 pr-9 border-2 rounded-full w-full focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none focus:ring-0 focus:ring-offset-0 focus:outline-none",
            "[&::placeholder]:text-[var(--placeholder-color)]"
          )}
          style={{
            backgroundColor: 'hsl(var(--background))',
            borderColor: isDark ? 'hsla(0, 0%, 60%, 0.5)' : 'hsl(var(--border))',
            outline: 'none',
            '--placeholder-color': isDark ? 'hsla(0, 0%, 60%, 0.5)' : 'hsl(var(--border))',
          } as React.CSSProperties & { '--placeholder-color': string }}
          onFocus={(e) => {
            e.target.style.outline = 'none';
            e.target.style.boxShadow = 'none';
          }}
          {...props}
        />
        {value && (
          <button
            type="button"
            onClick={handleClear}
            disabled={disabled}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50 z-10"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    );
  }
);

SearchInput.displayName = "SearchInput";

