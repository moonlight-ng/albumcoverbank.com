import type {
  Cover,
  ApiRecord,
  ApiCoversResponse,
  CoversResponse,
  FetchCoversParams,
} from "@/types/api";

const apiToken = process.env.NOCODB_API_TOKEN;
const baseUrl =
  process.env.NOCODB_BASE_URL ||
  "https://album-cover-bank.fly.dev/api/v2/tables/mqd7p7jjt99xk3o/records";
const viewId = process.env.NOCODB_VIEW_ID;

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

/**
 * Server-side fetch function for covers.
 * Fetches directly from NocoDB API, bypassing the /api/covers route.
 * Use this in Server Components to pre-fetch data.
 */
export const fetchCoversServer = async (
  params: FetchCoversParams
): Promise<CoversResponse> => {
  const { offset = 0, limit = 50 } = params;

  if (!apiToken || !viewId) {
    console.error("[fetch-server] Missing env vars:", {
      hasApiToken: !!apiToken,
      hasViewId: !!viewId,
    });
    return { records: [], offset: null };
  }

  try {
    const queryParams = new URLSearchParams({
      offset: offset.toString(),
      limit: limit.toString(),
      viewId: viewId,
    });

    const url = `${baseUrl}?${queryParams.toString()}`;

    const response = await fetch(url, {
      headers: { "xc-token": apiToken },
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data: ApiCoversResponse & { list?: ApiRecord[] } =
      await response.json();

    // Transform records, filtering out any that fail transformation
    const rawRecords = data.records || data.list || [];
    const records = rawRecords
      .map((record) => {
        try {
          return transformRecord(record);
        } catch {
          return null;
        }
      })
      .filter((record): record is Cover => record !== null);

    console.log("[fetch-server] Result:", {
      rawCount: rawRecords.length,
      transformedCount: records.length,
    });

    return {
      records,
      offset: data.offset || null,
    };
  } catch (error) {
    console.error("Error fetching covers (server):", error);
    // Return empty array on error to allow page to render
    return { records: [], offset: null };
  }
};
