"use client";

import { useSearchParams, useRouter } from "next/navigation";

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

export const Timeline = () => {
  const years = generateYears();
  const searchParams = useSearchParams();
  const router = useRouter();
  const selectedYear = searchParams.get("year");

  const handleYearClick = (year: number | null) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (year === null) {
      // Remove year param for "All"
      params.delete("year");
    } else {
      // Set year param
      params.set("year", year.toString());
    }
    
    router.push(`?${params.toString()}`);
  };

  const isActive = (year: number | null) => {
    if (year === null) {
      // "All" is active when no year param exists
      return !selectedYear;
    }
    return selectedYear === year.toString();
  };

  return (
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
            onClick={() => handleYearClick(null)}
            className={`
              text-xs
              transition-colors
              cursor-pointer
              whitespace-nowrap md:whitespace-normal
              flex-shrink-0
              ${
                isActive(null)
                  ? "text-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground"
              }
            `}
          >
            All
          </li>
          {years.map((year) => (
            <li
              key={year}
              onClick={() => handleYearClick(year)}
              className={`
                text-xs
                transition-colors
                cursor-pointer
                whitespace-nowrap md:whitespace-normal
                flex-shrink-0
                ${
                  isActive(year)
                    ? "text-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground"
                }
              `}
            >
              {year}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

