"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "motion/react";
import { fetchCovers } from "@/lib/fetch";
import type { Cover } from "@/types/api";
import { Cover as CoverComponent } from "@/components/cover";
import { Skeleton } from "@/components/ui/skeleton";
import { PageHeader } from "@/components/layout/header";
import { useState, useEffect } from "react";
import { CoverSheet } from "@/components/cover-sheet";
import { PageContainer } from "@/components/layout/container";

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
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: {
      duration: 0.2,
    },
  },
};

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [selectedCover, setSelectedCover] = useState<Cover | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const {
    data,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    error,
  } = useInfiniteQuery({
    queryKey: ["covers", debouncedSearchQuery],
    queryFn: ({ pageParam = 0 }) =>
      fetchCovers({
        offset: pageParam,
        limit: 50,
        searchTerm: debouncedSearchQuery,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage.offset) {
        return parseInt(lastPage.offset, 10);
      }
      return undefined;
    },
  });

  const covers: Cover[] = data?.pages.flatMap((page) => page.records) ?? [];

  if (error) {
    return (
      <div className="flex flex-col h-full">
        <PageHeader
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          isLoading={isLoading}
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
          isLoading={isLoading}
        />
        <div className="flex-1 overflow-y-auto">
          <PageContainer className="p-6">
            <div className="flex items-center justify-center h-full">
              <p className="text-muted-foreground">
                No covers found for &quot;{debouncedSearchQuery}&quot;
              </p>
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
        isLoading={isLoading}
      />
      <div className="flex-1 overflow-y-auto">
        <PageContainer className="p-6">
          {isLoading && covers.length === 0 ? (
            <ul className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4">
              {Array.from({ length: 50 }, (_, index) => {
                const skeletonId = `initial-skeleton-${index}`;
                return (
                  <li key={skeletonId}>
                    <Skeleton className="aspect-square w-full rounded-lg" />
                  </li>
                );
              })}
            </ul>
          ) : (
            <motion.ul
              animate="visible"
              className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4"
              initial="hidden"
              variants={containerVariants}
            >
              <AnimatePresence mode="popLayout">
                {covers.map((cover, index) => (
                  <motion.li
                    animate="visible"
                    exit="exit"
                    initial="hidden"
                    key={`${cover.album}-${index}`}
                    layout
                    layoutId={`${cover.album}-${index}`}
                    variants={itemVariants}
                  >
                    <CoverComponent
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
          )}
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
