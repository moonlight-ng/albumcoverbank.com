const axios = require("axios");

const apiToken = "sKDNmrHDbhfJ6cX5Z3VJdJGLrAxksSbWu6KTv9B9";
const baseUrl = "https://album-cover-bank.fly.dev/api/v2/tables/mqd7p7jjt99xk3o/records";

module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
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
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ error: "Missing required parameter: id" });
    }

    // Fetch single record by ID
    const response = await axios.get(`${baseUrl}/${id}`, {
      headers: { "xc-token": apiToken },
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching cover by ID:", error);
    
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
