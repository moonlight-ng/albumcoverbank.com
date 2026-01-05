"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "motion/react";
import { fetchCovers } from "@/lib/fetch";
import type { Cover, CoversResponse } from "@/types/api";
import { Skeleton } from "@/components/ui/skeleton";
import { PageHeader } from "@/components/layout/header";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { PageContainer } from "@/components/layout/container";
import { AlbumCover } from "@/components/album-cover";
import { useQueryState, parseAsString, parseAsInteger } from "nuqs";
import { Button } from "@/components/ui/button";

const CoverSheet = dynamic(
  () => import("@/components/cover-sheet").then((mod) => mod.CoverSheet),
  { ssr: false },
);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.3,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 10,
    transition: {
      duration: 0.2,
    },
  },
};

interface HomeContentProps {
  initialData: CoversResponse;
}

export function HomeContent({ initialData }: HomeContentProps) {
  const [searchQuery, setSearchQuery] = useQueryState(
    "q",
    parseAsString.withDefault(""),
  );
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery);
  const [isTyping, setIsTyping] = useState(false);
  const [selectedCover, setSelectedCover] = useState<Cover | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const [selectedYear, setSelectedYear] = useQueryState("year", parseAsInteger);

  useEffect(() => {
    if (!searchQuery || searchQuery.trim() === "") {
      setDebouncedSearchQuery("");
      setIsTyping(false);
      return;
    }

    if (searchQuery.length < 2) {
      setIsTyping(false);
      return;
    }

    setIsTyping(true);

    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
      setIsTyping(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const LIMIT = 50;

  // Determine if we should use initial data (only on fresh load with no filters)
  const hasFilters = Boolean(debouncedSearchQuery || selectedYear);

  const {
    data,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    error,
  } = useInfiniteQuery({
    queryKey: ["covers", debouncedSearchQuery, selectedYear],
    queryFn: ({ pageParam = 0 }) =>
      fetchCovers({
        offset: pageParam,
        limit: LIMIT,
        searchTerm: debouncedSearchQuery,
        year: selectedYear ?? undefined,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      // If API returns an offset, use it
      if (lastPage.offset) {
        return parseInt(lastPage.offset, 10);
      }

      // If offset is null but we got a full page of results,
      // calculate the next offset based on total records fetched
      if (lastPage.records.length === LIMIT) {
        const totalRecordsFetched = allPages.reduce(
          (sum, page) => sum + page.records.length,
          0,
        );
        return totalRecordsFetched;
      }

      // No more pages
      return undefined;
    },
    // Use placeholderData instead of initialData - it shows while fetching
    // and doesn't have the stale cache issues when switching filters
    // Only use if server actually returned data
    placeholderData:
      !hasFilters && initialData.records.length > 0
        ? {
            pages: [initialData],
            pageParams: [0],
          }
        : undefined,
  });

  const covers: Cover[] = data?.pages.flatMap((page) => page.records) ?? [];

  if (error) {
    return (
      <div className="flex flex-col h-full">
        <PageHeader
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedYear={selectedYear}
          onYearClear={() => setSelectedYear(null)}
          isLoading={isLoading}
          isTyping={isTyping}
        />
        <div className="flex-1 overflow-y-auto">
          <PageContainer className="p-6">
            <div className="flex flex-col items-center justify-center h-full gap-2">
              <p className="text-destructive">Error loading covers</p>
              <p className="text-sm text-muted-foreground">
                {error instanceof Error ? error.message : "Unknown error"}
              </p>
            </div>
          </PageContainer>
        </div>
      </div>
    );
  }

  if (!isLoading && covers.length === 0 && debouncedSearchQuery) {
    return (
      <div className="flex flex-col h-full">
        <PageHeader
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedYear={selectedYear}
          onYearClear={() => setSelectedYear(null)}
          isLoading={isLoading}
          isTyping={isTyping}
        />
        <div className="flex-1 overflow-y-auto">
          <PageContainer className="p-6 flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <p className="text-muted-foreground">
                No covers found for &quot;{debouncedSearchQuery}&quot;
              </p>
              <Button
                onClick={() => setSearchQuery("")}
                className="rounded-full w-fit"
              >
                Reset Filters
              </Button>
            </div>
          </PageContainer>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <PageHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedYear={selectedYear}
        onYearClear={() => setSelectedYear(null)}
        isLoading={isLoading}
        isTyping={isTyping}
      />
      <div className="flex-1 overflow-y-auto">
        <PageContainer className="p-6">
          <motion.ul
            animate={covers.length > 0 ? "visible" : undefined}
            className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4"
            initial={covers.length > 0 ? "hidden" : undefined}
            variants={containerVariants}
          >
            <AnimatePresence mode="popLayout">
              {isLoading && covers.length === 0
                ? Array.from({ length: 50 }, (_, index) => {
                    const skeletonId = `initial-skeleton-${index}`;
                    return (
                      <motion.li
                        key={skeletonId}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Skeleton className="aspect-square w-full rounded-lg" />
                      </motion.li>
                    );
                  })
                : covers.map((cover, index) => (
                    <motion.li
                      animate="visible"
                      exit="exit"
                      initial="hidden"
                      key={`${cover.album}-${index}`}
                      layout
                      layoutId={`${cover.album}-${index}`}
                      variants={itemVariants}
                    >
                      <AlbumCover
                        {...cover}
                        id={`${cover.album}-${index}`}
                        onClick={() => {
                          setSelectedCover(cover);
                          setIsSheetOpen(true);
                        }}
                      />
                    </motion.li>
                  ))}
              {isFetchingNextPage &&
                Array.from({ length: 10 }, (_, index) => (
                  <motion.li
                    key={`next-skeleton-${covers.length + index}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Skeleton className="aspect-square w-full rounded-lg" />
                  </motion.li>
                ))}
            </AnimatePresence>
          </motion.ul>
          {hasNextPage && (
            <motion.div
              className="h-1"
              onViewportEnter={() => {
                if (!isFetchingNextPage) {
                  fetchNextPage();
                }
              }}
            />
          )}
        </PageContainer>
      </div>
      <CoverSheet
        cover={selectedCover}
        isOpen={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
      />
    </div>
  );
}
