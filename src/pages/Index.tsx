import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { SearchInput } from "../components/ui/search-input";
import { Loader } from "../components/ui/loader";
import { Cover } from "../components/Cover";
import { Aside } from "../components/Aside";
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

  const getLoadingMessage = () => {
    if (isPendingSearch) {
      return `Searching for "${searchQuery}"`;
    }
    if (debouncedSearchQuery) {
      return `Searching for "${debouncedSearchQuery}"`;
    }
    return "";
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-full bg-background">
      <Aside />

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center gap-3 px-6 py-4">
          <SearchInput
            value={searchQuery}
            onValueChange={setSearchQuery}
            placeholder="Search albums, artists, designers..."
            disabled={isLoading}
          />
          <a
            href="mailto:ope@moonlight.ng?subject=Album%20Cover%20Submission"
            className="hidden md:block"
          >
            <Button>Submit a cover</Button>
          </a>
        </header>

        <div className="flex-1 overflow-y-auto p-6">
          {showLoading && (
            <Loader message={getLoadingMessage()} />
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
