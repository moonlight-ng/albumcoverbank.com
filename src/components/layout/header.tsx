"use client";

import { Search, X, Loader2 } from "lucide-react";
import Link from "next/link";
import { Input } from "../ui/input";
import { AnimatePresence, motion } from "motion/react";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  searchQuery: string;
  onSearchChange: (value: string | null) => void;
  selectedYear?: number | null;
  onYearClear?: () => void;
  isLoading?: boolean;
  isTyping?: boolean;
}

export const PageHeader = ({
  searchQuery,
  onSearchChange,
  selectedYear,
  onYearClear,
  isLoading = false,
  isTyping = false,
}: PageHeaderProps) => {
  const handleClear = () => {
    onSearchChange(null);
  };

  return (
    <header className="flex flex-col gap-2 px-6 py-4">
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          {isTyping || isLoading ? (
            <Loader2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none z-10 animate-spin" />
          ) : (
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none z-10" />
          )}
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value || null)}
            placeholder="Search albums, artists, designers..."
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
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "hidden text-sm md:block rounded-full",
          )}
        >
          Submit a cover
        </Link>
      </div>
      <AnimatePresence mode="popLayout">
        {selectedYear && (
          <motion.div
            initial={{ opacity: 0, translateY: 10 }}
            animate={{ opacity: 1, translateY: 0 }}
            exit={{ opacity: 0, translateY: 10 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-2"
          >
            <span className="text-xs text-muted-foreground">Filters:</span>
            <button
              type="button"
              onClick={onYearClear}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
            >
              {selectedYear}
              <X className="h-3 w-3" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
