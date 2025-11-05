import { Info } from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import { ThemeToggle } from "./ui/theme-toggle";

const Logo = () => {
  const { theme } = useTheme();
  return (
    <img 
      src={theme === "dark" ? "/logo-white.svg" : "/logo.svg"} 
      alt="Logo" 
      className="h-9 w-9" 
    />
  );
};

export const Aside = () => {
  return (
    <aside className="relative md:relative flex md:w-16 flex-row md:flex-col items-center md:items-center justify-between md:justify-between border-b md:border-b-0 md:border-r border-border px-4 md:px-0 py-3 md:py-0 md:h-full w-full md:w-16">
      <div className="flex items-center md:py-4 md:justify-center">
        <Link to="/">
          <Logo />
        </Link>
      </div>
      <div className="flex flex-row md:flex-col items-center gap-3 md:gap-0 md:py-4 md:justify-center">
        <ThemeToggle />
        <Link
          to="/about"
          className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center text-foreground transition-opacity hover:opacity-60"
        >
          <Info className="h-5 w-5" />
        </Link>
      </div>
    </aside>
  );
};

