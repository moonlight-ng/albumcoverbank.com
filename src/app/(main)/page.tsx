import { Suspense } from "react";
import { fetchCoversServer } from "@/lib/fetch-server";
import { HomeContent } from "./page-client";
import { Skeleton } from "@/components/ui/skeleton";
import { PageContainer } from "@/components/layout/container";
import { Search } from "lucide-react";

// ISR: Revalidate every hour - page is cached at build and refreshed periodically
export const revalidate = 3600;

function LoadingFallback() {
  return (
    <div className="flex flex-col h-full">
      <header className="flex flex-col gap-2 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none z-10" />
            <input
              type="text"
              disabled
              placeholder="Search albums, artists, designers..."
              className="pl-9 pr-9 h-10 border-2 rounded-full w-full bg-background text-sm opacity-50"
            />
          </div>
        </div>
      </header>
      <div className="flex-1 overflow-y-auto">
        <PageContainer className="p-6">
          <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
            {Array.from({ length: 50 }, (_, index) => (
              <Skeleton
                // biome-ignore lint/suspicious/noArrayIndexKey: skeleton items
                key={index}
                className="aspect-square w-full rounded-lg"
              />
            ))}
          </div>
        </PageContainer>
      </div>
    </div>
  );
}

export default async function Home() {
  const initialData = await fetchCoversServer({ limit: 50, offset: 0 });

  return (
    <Suspense fallback={<LoadingFallback />}>
      <HomeContent initialData={initialData} />
    </Suspense>
  );
}
