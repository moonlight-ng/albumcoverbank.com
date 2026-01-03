"use client";

import { Suspense } from "react";
import { Info } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "../ui/theme-toggle";
import { Logo } from "../icons/logo";
import { Button } from "../ui/button";
import { Timeline } from "./timeline";

export const Aside = () => {
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
      <div className="flex items-center justify-center shrink-0 px-4 md:px-0 py-3 md:py-4">
        <Link href="/" className="text-[#683522] dark:text-primary">
          <Logo className="h-9 w-9" />
        </Link>
      </div>

      {/* Timeline (flex-1, scrolls) */}
      <Suspense fallback={<div className="flex-1" />}>
        <Timeline />
      </Suspense>

      {/* Actions (fixed) */}
      <div
        className="
          mt-auto
          flex flex-row md:flex-col
          items-center justify-center
          gap-3 md:gap-2
          shrink-0
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
