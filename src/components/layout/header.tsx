"use client";

import { Search, X } from "lucide-react";
import Link from "next/link";
import { Input } from "../ui/input";

interface PageHeaderProps {
  searchQuery: string;
  onSearchChange: (value: string | null) => void;
  isLoading?: boolean;
}

export const PageHeader = ({
  searchQuery,
  onSearchChange,
  isLoading = false,
}: PageHeaderProps) => {
  const handleClear = () => {
    onSearchChange(null);
  };

  return (
    <header className="flex items-center gap-3 px-6 py-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none z-10" />
        <Input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value || null)}
          placeholder="Search albums, artists, designers..."
          disabled={isLoading}
          className="pl-9 pr-9 border-2 rounded-full w-full focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none focus:ring-0 focus:ring-offset-0 focus:outline-none"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={handleClear}
            disabled={isLoading}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50 z-10"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
      <Link
        href="/submit"
        className="hidden text-sm md:block hover:underline underline-offset-4"
      >
        Submit a cover
      </Link>
    </header>
  );
};
