import { Search, Loader2, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Cover } from "../components/Cover";
import { Aside } from "../components/Aside";
import { ThemeToggle } from "../components/ui/theme-toggle";
import { useCovers } from "../hooks/useCovers";
import { useSearchQuery } from "../hooks/useSearchQuery";

const Index = () => {
  const { searchQuery, debouncedSearchQuery, setSearchQuery } = useSearchQuery();

  const { covers, isLoading, isFetching, error } = useCovers({
    offset: 0,
    limit: 25,
    searchTerm: debouncedSearchQuery,
  });

  // Show loading when API is loading/fetching OR when user is typing (debounce pending)
  const isPendingSearch = searchQuery !== debouncedSearchQuery;
  const showLoading = isLoading || isFetching || isPendingSearch;

  return (
    <div className="flex h-screen w-full bg-background">
      <Aside />

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center gap-3 px-6 py-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search albums, artists, designers..."
              className="pl-9 pr-9 border-2 rounded-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              disabled={isLoading}
              style={{
                backgroundColor: 'hsl(var(--background))',
                borderColor: 'hsl(var(--border))'
              }}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
          <Link to="/submit">
            <Button>Submit a cover</Button>
          </Link>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6">
          {showLoading && (
            <div className="flex flex-col items-center justify-center h-full gap-3">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              <p className="text-muted-foreground">
                {isPendingSearch
                  ? `Searching for "${searchQuery}"...`
                  : debouncedSearchQuery
                  ? `Searching for "${debouncedSearchQuery}"...`
                  : "Loading covers..."}
              </p>
            </div>
          )}
          
          {error && !showLoading && (
            <div className="flex flex-col items-center justify-center h-full gap-2">
              <p className="text-destructive">Error loading covers</p>
              <p className="text-sm text-muted-foreground">{error.message}</p>
            </div>
          )}

          {!showLoading && !error && (
            <>
              {covers.length === 0 && debouncedSearchQuery ? (
                <div className="flex items-center justify-center h-full">
                  <p className="text-muted-foreground">
                    No covers found for "{debouncedSearchQuery}"
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {covers.map((cover, index) => (
                    <Cover key={`${cover.album}-${index}`} {...cover} id={index} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
