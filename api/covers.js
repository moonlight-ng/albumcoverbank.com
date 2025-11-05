const axios = require("axios");

const apiToken = "sKDNmrHDbhfJ6cX5Z3VJdJGLrAxksSbWu6KTv9B9";
const baseUrl = "https://album-cover-bank.fly.dev/api/v2/tables/mqd7p7jjt99xk3o/records";
const viewId = "vwuawhorty6jzuyz";

// Helper function to build where clause for search
const buildSearchWhere = (searchTerm) => {
  if (!searchTerm || searchTerm.trim() === "") {
    return "";
  }
  const encodedTerm = encodeURIComponent(searchTerm.trim());
  return `(Album,like,%${encodedTerm}%)~or(Music Artist,like,%${encodedTerm}%)~or(Cover Artist,like,%${encodedTerm}%)`;
};

module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,POST");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Get parameters from query string
    const { offset = "0", limit = "25", searchTerm = "" } = req.query;

    const whereClause = buildSearchWhere(searchTerm);

    const params = new URLSearchParams({
      offset: offset,
      limit: limit,
      viewId: viewId,
    });

    if (whereClause) {
      params.append("where", whereClause);
    }

    const response = await axios.get(`${baseUrl}?${params.toString()}`, {
      headers: { "xc-token": apiToken },
    });

    const data = response.data;

    // Transform response to match expected format
    // The API returns { records: [...], offset: ... } structure
    const result = {
      records: data.records || data.list || (Array.isArray(data) ? data : []),
      offset: data.offset || data.pageInfo?.nextCursor || null,
    };

    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching covers:", error);
    
    if (error.response) {
      res.status(error.response.status || 500).json({
        error: `Server error: ${error.response.status}`,
        message: error.response.data?.message || error.message,
      });
    } else if (error.request) {
      res.status(503).json({
        error: "Network error: Could not connect to server",
      });
    } else {
      res.status(500).json({
        error: "Internal server error",
        message: error.message,
      });
    }
  }
}; 