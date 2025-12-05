"use client";

import { Info } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "../ui/theme-toggle";
import { Logo } from "../icons/logo";
import { Button } from "../ui/button";

// Generate years from 1950 to current year
const generateYears = (): number[] => {
  const currentYear = new Date().getFullYear();
  const startYear = 1950;
  const years: number[] = [];
  for (let year = currentYear; year >= startYear; year--) {
    years.push(year);
  }
  return years;
};

export const Aside = () => {
  const years = generateYears();

  return (
    <aside
      className="
        flex h-full
        flex-row md:flex-col
        md:w-16
        border-b md:border-b-0 md:border-r border-border
        overflow-hidden
      "
    >
      {/* Logo (fixed) */}
      <div className="flex items-center justify-center flex-shrink-0 px-4 md:px-0 py-3 md:py-4">
        <Link href="/" className="text-[#683522] dark:text-primary">
          <Logo className="h-9 w-9" />
        </Link>
      </div>

      {/* Timeline (flex-1, scrolls) */}
      <div className="flex-1 min-w-0 min-h-0 overflow-hidden relative">
        {/* Top fade gradient */}
        <div
          className="
            absolute top-0 left-0 right-0
            h-8 md:h-12
            pointer-events-none
            z-10
            bg-gradient-to-b from-background to-transparent
          "
        />
        {/* Bottom fade gradient */}
        <div
          className="
            absolute bottom-0 left-0 right-0
            h-8 md:h-12
            pointer-events-none
            z-10
            bg-gradient-to-t from-background to-transparent
          "
        />
        <div
          className="
            h-full w-full
            overflow-x-auto overflow-y-hidden
            md:overflow-x-hidden md:overflow-y-auto
            scrollbar-hide
          "
        >
          <ul
            className="
              flex
              flex-row md:flex-col
              items-center md:items-center
              justify-start md:justify-start
              gap-2 md:gap-1
              px-2 md:px-0
              py-2 md:py-4
              w-max md:w-full
            "
          >
            <li
              className="
                text-xs text-muted-foreground
                hover:text-foreground
                transition-colors
                cursor-pointer
                whitespace-nowrap md:whitespace-normal
                flex-shrink-0
              "
            >
              All
            </li>
            {years.map((year) => (
              <li
                key={year}
                className="
                  text-xs text-muted-foreground
                  hover:text-foreground
                  transition-colors
                  cursor-pointer
                  whitespace-nowrap md:whitespace-normal
                  flex-shrink-0
                "
              >
                {year}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Actions (fixed) */}
      <div
        className="
          flex flex-row md:flex-col
          items-center justify-center
          gap-3 md:gap-2
          flex-shrink-0
          px-4 md:px-0
          py-3 md:py-4
        "
      >
        <ThemeToggle />
        <Button variant="ghost" size="icon" asChild>
          <Link href="/about" aria-label="About">
            <Info className="size-4" />
          </Link>
        </Button>
      </div>
    </aside>
  );
};
