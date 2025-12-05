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
  if (
    !record.Image ||
    !Array.isArray(record.Image) ||
    record.Image.length === 0
  ) {
    throw new Error("Record missing Image array");
  }

  const image = record.Image[0];
  if (!image || !image.signedUrl) {
    throw new Error("Record Image missing signedUrl");
  }

  const imageUrl = image.signedUrl;

  return {
    album: record.Album || "",
    imageUrl,
    sourceUrl: record.Source || "",
    year: record.Year ? parseInt(record.Year, 10) : 0,
    musicArtistName: record["Name (from Music Artists)"]?.[0] || "",
    musicArtistUrl: record["Website (from Music Artists)"]?.[0] || "",
    coverArtistName: record["Name (from Cover Artists)"]?.[0] || "",
    coverArtistUrl: record["Website (from Cover Artists)"]?.[0] || "",
  };
};

export const fetchCovers = async (
  params: FetchCoversParams,
): Promise<CoversResponse> => {
  const { offset = 0, limit = 50, searchTerm = "", year } = params;

  const queryParams = new URLSearchParams({
    offset: offset.toString(),
    limit: limit.toString(),
  });

  if (searchTerm) {
    queryParams.append("searchTerm", searchTerm);
  }

  if (year) {
    queryParams.append("year", year.toString());
  }

  try {
    const response = await axios.get<ApiCoversResponse>(
      `/api/covers?${queryParams.toString()}`,
    );

    // Safely transform records, filtering out any that fail transformation
    // Records without images are expected and will be silently skipped
    const records = (response.data.records || [])
      .map((record) => {
        try {
          return transformRecord(record);
        } catch {
          // Silently skip records without images or other required fields
          // This is expected behavior for incomplete records in the database
          return null;
        }
      })
      .filter((record): record is Cover => record !== null);

    return {
      records,
      offset: response.data.offset || null,
    };
  } catch (error) {
    console.error("Error fetching covers:", error);
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Unknown error";
      const statusCode = error.response?.status;
      throw new Error(
        `Failed to fetch covers${
          statusCode ? ` (${statusCode})` : ""
        }: ${errorMessage}`,
      );
    }
    throw new Error(
      `Failed to fetch covers: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
    );
  }
};
