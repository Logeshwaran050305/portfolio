const CONTENT_KEY = "portfolio:content";

function kvRequestUrl() {
  const baseUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!baseUrl || !token) return null;
  return { baseUrl, token };
}

async function runKvCommand(command) {
  const config = kvRequestUrl();
  if (!config) return null;

  const response = await fetch(config.baseUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(command)
  });

  if (!response.ok) {
    throw new Error(`KV request failed with status ${response.status}`);
  }

  return response.json();
}

export default async function handler(request, response) {
  const config = kvRequestUrl();
  if (!config) {
    return response.status(503).json({
      error: "Shared content storage is not configured. Add KV_REST_API_URL/KV_REST_API_TOKEN or UPSTASH_REDIS_REST_URL/UPSTASH_REDIS_REST_TOKEN in Vercel."
    });
  }

  try {
    if (request.method === "GET") {
      const result = await runKvCommand(["GET", CONTENT_KEY]);
      const content = result?.result ? JSON.parse(result.result) : null;
      return response.status(200).json({ content });
    }

    if (request.method === "PUT") {
      const content = typeof request.body === "string" ? JSON.parse(request.body) : request.body;
      if (!content || typeof content !== "object") {
        return response.status(400).json({ error: "A content object is required." });
      }

      await runKvCommand(["SET", CONTENT_KEY, JSON.stringify(content)]);
      return response.status(200).json({ ok: true });
    }

    response.setHeader("Allow", "GET, PUT");
    return response.status(405).json({ error: "Method not allowed." });
  } catch (error) {
    console.error("Content API error:", error);
    return response.status(500).json({ error: "Unable to access shared portfolio content." });
  }
}