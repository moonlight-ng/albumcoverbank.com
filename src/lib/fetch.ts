import axios from "axios";
import type {
  Cover,
  ApiRecord,
  ApiCoversResponse,
  CoversResponse,
  FetchCoversParams,
} from "@/types/api";

// Transform API record to Cover type
const transformRecord = (record: ApiRecord): Cover => {
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

export const fetchCovers = async (
  params: FetchCoversParams
): Promise<CoversResponse> => {
  const { offset = 0, limit = 50, searchTerm = "" } = params;

  const queryParams = new URLSearchParams({
    offset: offset.toString(),
    limit: limit.toString(),
  });

  if (searchTerm) {
    queryParams.append("searchTerm", searchTerm);
  }

  try {
    const response = await axios.get<ApiCoversResponse>(
      `/api/covers?${queryParams.toString()}`
    );

    return {
      records: response.data.records?.map(transformRecord) || [],
      offset: response.data.offset || null,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message ||
          `Failed to fetch covers: ${error.message}`
      );
    }
    throw new Error("Failed to fetch covers: Unknown error");
  }
};
