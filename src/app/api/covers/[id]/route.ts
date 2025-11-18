import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import axios from "axios";

const apiToken = process.env.NOCODB_API_TOKEN;
const baseUrl =
  process.env.NOCODB_BASE_URL ||
  "https://album-cover-bank.fly.dev/api/v2/tables/mqd7p7jjt99xk3o/records";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!apiToken) {
    return NextResponse.json(
      {
        error: "Server configuration error",
        message: "API credentials are not configured",
      },
      { status: 500 },
    );
  }

  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: "Missing required parameter: id" },
        { status: 400 },
      );
    }

    // Fetch single record by ID
    const response = await axios.get(`${baseUrl}/${id}`, {
      headers: { "xc-token": apiToken },
    });

    return NextResponse.json(response.data, { status: 200 });
  } catch (error: unknown) {
    console.error("Error fetching cover by ID:", error);

    if (axios.isAxiosError(error)) {
      if (error.response) {
        return NextResponse.json(
          {
            error: `Server error: ${error.response.status}`,
            message: error.response.data?.message || error.message,
          },
          { status: error.response.status || 500 },
        );
      } else if (error.request) {
        return NextResponse.json(
          {
            error: "Network error: Could not connect to server",
          },
          { status: 503 },
        );
      }
    }

    return NextResponse.json(
      {
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
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
      "Access-Control-Allow-Methods": "GET,OPTIONS",
      "Access-Control-Allow-Headers":
        "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
    },
  });
}
