import { Info } from "lucide-react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <img src="/logo.svg" alt="Logo" className="h-9 w-9" />
  );
};

export const Aside = () => {
  return (
    <aside className="hidden md:flex w-16 flex-col items-center justify-between border-r border-border">
      <div className="py-4">
        <Link to="/">
          <Logo />
        </Link>
      </div>
      <div>
        <Link
          to="/about"
          className="flex h-12 w-12 items-center justify-center text-foreground transition-opacity hover:opacity-60"
        >
          <Info className="h-5 w-5" />
        </Link>
      </div>
    </aside>
  );
};

