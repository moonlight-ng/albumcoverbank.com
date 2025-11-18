import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import axios from "axios";

const apiToken = process.env.NOCODB_API_TOKEN;
const baseUrl =
  process.env.NOCODB_BASE_URL ||
  "https://album-cover-bank.fly.dev/api/v2/tables/mqd7p7jjt99xk3o/records";
const viewId = process.env.NOCODB_VIEW_ID;

// Helper function to build where clause for search
const buildSearchWhere = (searchTerm: string): string => {
  if (!searchTerm || searchTerm.trim() === "") {
    return "";
  }
  // Don't encode the search term - NocoDB will handle it
  const searchValue = searchTerm.trim();
  return `(Album,like,%${searchValue}%)~or(Name (from Music Artists),like,%${searchValue}%)~or(Name (from Cover Artists),like,%${searchValue}%)`;
};

export async function GET(request: NextRequest) {
  if (!apiToken || !viewId) {
    return NextResponse.json(
      {
        error: "Server configuration error",
        message: "API credentials are not configured",
      },
      { status: 500 }
    );
  }

  try {
    // Get parameters from query string
    const searchParams = request.nextUrl.searchParams;
    const offset = searchParams.get("offset") || "0";
    const limit = searchParams.get("limit") || "25";
    const searchTerm = searchParams.get("searchTerm") || "";

    console.log("Fetching covers with params:", { offset, limit, searchTerm });

    const whereClause = buildSearchWhere(searchTerm);

    // Build query parameters manually to avoid double-encoding issues with where clause
    const params = new URLSearchParams({
      offset: offset,
      limit: limit,
      viewId: viewId,
    });

    // Add where clause separately - URLSearchParams will encode it properly
    if (whereClause) {
      params.append("where", whereClause);
    }

    const url = `${baseUrl}?${params.toString()}`;
    console.log("NocoDB API URL:", url.replace(apiToken || "", "[REDACTED]"));

    const response = await axios.get(url, {
      headers: { "xc-token": apiToken },
    });

    const data = response.data;
    console.log("NocoDB response:", {
      recordsCount: data.records?.length || data.list?.length || 0,
      hasOffset: !!data.offset,
      hasPageInfo: !!data.pageInfo,
      pageInfo: data.pageInfo,
    });

    // Transform response to match expected format
    // The API returns { records: [...], offset: ... } structure
    const result = {
      records: data.records || data.list || (Array.isArray(data) ? data : []),
      offset: data.offset || data.pageInfo?.nextCursor || null,
    };

    return NextResponse.json(result, { status: 200 });
  } catch (error: unknown) {
    console.error("Error fetching covers:", error);

    if (axios.isAxiosError(error)) {
      if (error.response) {
        return NextResponse.json(
          {
            error: `Server error: ${error.response.status}`,
            message: error.response.data?.message || error.message,
          },
          { status: error.response.status || 500 }
        );
      } else if (error.request) {
        return NextResponse.json(
          {
            error: "Network error: Could not connect to server",
          },
          { status: 503 }
        );
      }
    }

    return NextResponse.json(
      {
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// Handle OPTIONS for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,OPTIONS,POST",
      "Access-Control-Allow-Headers":
        "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
    },
  });
}
