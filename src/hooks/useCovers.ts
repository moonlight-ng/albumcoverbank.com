import { useQuery } from "react-query";
import { Cover } from "../lib/types";

interface CoversResponse {
  records: any[];
  offset: string | null;
}

interface UseCoversParams {
  offset?: number;
  limit?: number;
  searchTerm?: string;
}

interface UseCoversResult {
  covers: Cover[];
  isLoading: boolean;
  isFetching: boolean;
  error: Error | null;
  offset: string | null;
}

// Transform API record to Cover type
const transformRecord = (record: any): Cover => {
  const image = record.Image[0];
  const imageUrl = image.signedUrl;

  return {
    album: record.Album,
    imageUrl,
    sourceUrl: record.Source,
    year: parseInt(record.Year, 10),
    musicArtistName: record["Name (from Music Artists)"][0],
    musicArtistUrl: record["Website (from Music Artists)"][0],
    coverArtistName: record["Name (from Cover Artists)"][0],
    coverArtistUrl: record["Website (from Cover Artists)"][0],
  };
};

const fetchCovers = async (params: UseCoversParams): Promise<CoversResponse> => {
  const { offset = 0, limit = 25, searchTerm = "" } = params;

  const queryParams = new URLSearchParams({
    offset: offset.toString(),
    limit: limit.toString(),
  });

  if (searchTerm) {
    queryParams.append("searchTerm", searchTerm);
  }

  const response = await fetch(`/api/covers?${queryParams.toString()}`);
  
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
};

export const useCovers = (params: UseCoversParams = {}): UseCoversResult => {
  const { data, isLoading, isFetching, error, isPreviousData } = useQuery<CoversResponse, Error>(
    ["covers", params.offset, params.limit, params.searchTerm],
    () => fetchCovers(params),
    {
      keepPreviousData: true,
      staleTime: 5 * 60 * 1000, // 5 minutes
    }
  );

  // Show empty array when fetching new data (don't show stale data during search)
  const covers: Cover[] = isFetching && isPreviousData ? [] : (data?.records?.map(transformRecord) ?? []);

  return {
    covers,
    isLoading,
    isFetching,
    error: error ?? null,
    offset: data?.offset ?? null,
  };
};

