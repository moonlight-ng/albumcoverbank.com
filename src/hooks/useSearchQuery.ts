import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";

const SEARCH_PARAM = "q";

interface UseSearchQueryResult {
  searchQuery: string;
  debouncedSearchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const useSearchQuery = (debounceMs: number = 300): UseSearchQueryResult => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Initialize from URL
  const urlQuery = searchParams.get(SEARCH_PARAM) || "";
  const [searchQuery, setSearchQuery] = useState(urlQuery);
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(urlQuery);
  const isInternalUpdate = useRef(false);
  const lastUrlQuery = useRef(urlQuery);

  // Update local state when URL changes externally (e.g., browser back/forward)
  useEffect(() => {
    const currentUrlQuery = searchParams.get(SEARCH_PARAM) || "";
    
    // Only update if URL changed externally (not from our internal update)
    if (isInternalUpdate.current) {
      isInternalUpdate.current = false;
      lastUrlQuery.current = currentUrlQuery;
      return;
    }
    
    // If URL changed and it's different from what we last saw, it's an external change
    if (currentUrlQuery !== lastUrlQuery.current) {
      setSearchQuery(currentUrlQuery);
      setDebouncedSearchQuery(currentUrlQuery);
      lastUrlQuery.current = currentUrlQuery;
    }
  }, [searchParams]);

  // Debounce search query and update URL
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
      
      // Update URL without causing navigation
      const currentUrlQuery = searchParams.get(SEARCH_PARAM) || "";
      const trimmedQuery = searchQuery.trim();
      
      // Only update URL if it's different from current
      if (trimmedQuery !== currentUrlQuery) {
        isInternalUpdate.current = true;
        const newSearchParams = new URLSearchParams(searchParams);
        if (trimmedQuery) {
          newSearchParams.set(SEARCH_PARAM, trimmedQuery);
        } else {
          newSearchParams.delete(SEARCH_PARAM);
        }
        setSearchParams(newSearchParams, { replace: true });
        lastUrlQuery.current = trimmedQuery;
      }
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [searchQuery, debounceMs, searchParams, setSearchParams]);

  return {
    searchQuery,
    debouncedSearchQuery,
    setSearchQuery,
  };
};

