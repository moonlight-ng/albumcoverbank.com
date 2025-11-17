"use client";

import { Info } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "../ui/theme-toggle";
import { Logo } from "../icons/logo";
import { Button } from "../ui/button";

export const Aside = () => {
  return (
    <aside className="relative md:relative flex md:w-16 flex-row md:flex-col items-center md:items-center justify-between md:justify-between border-b md:border-b-0 md:border-r border-border px-4 md:px-0 py-3 md:py-0 md:h-full w-full">
      <div className="flex items-center md:py-4 md:justify-center">
        <Link href="/" className="text-[#683522] dark:text-primary">
          <Logo className="h-9 w-9" />
        </Link>
      </div>
      <div className="flex flex-row md:flex-col items-center gap-3 md:gap-2 md:py-4 md:justify-center">
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
