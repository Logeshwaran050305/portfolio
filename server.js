import { createServer } from "node:http";
import { createReadStream } from "node:fs";
import { access, stat } from "node:fs/promises";
import { extname, join, normalize, relative } from "node:path";
import { fileURLToPath } from "node:url";

const rootDirectory = fileURLToPath(new URL(".", import.meta.url));
const publicDirectory = join(rootDirectory, "dist");
const port = Number(process.env.PORT || 10000);
const contentKey = "portfolio:content";

function kvConfig() {
  const baseUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  return baseUrl && token ? { baseUrl, token } : null;
}

async function runKvCommand(command) {
  const config = kvConfig();
  if (!config) return null;

  const response = await fetch(config.baseUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(command)
  });

  if (!response.ok) throw new Error(`KV request failed with status ${response.status}`);
  return response.json();
}

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, { "Content-Type": "application/json; charset=utf-8" });
  response.end(JSON.stringify(payload));
}

async function readRequestBody(request) {
  let body = "";
  for await (const chunk of request) body += chunk;
  return body;
}

async function handleContentApi(request, response) {
  if (!kvConfig()) {
    sendJson(response, 503, {
      error: "Shared content storage is not configured. Add the Upstash environment variables in Render."
    });
    return;
  }

  try {
    if (request.method === "GET") {
      const result = await runKvCommand(["GET", contentKey]);
      const content = result?.result ? JSON.parse(result.result) : null;
      sendJson(response, 200, { content });
      return;
    }

    if (request.method === "PUT") {
      const content = JSON.parse(await readRequestBody(request));
      if (!content || typeof content !== "object" || Array.isArray(content)) {
        sendJson(response, 400, { error: "A content object is required." });
        return;
      }
      await runKvCommand(["SET", contentKey, JSON.stringify(content)]);
      sendJson(response, 200, { ok: true });
      return;
    }

    response.setHeader("Allow", "GET, PUT");
    sendJson(response, 405, { error: "Method not allowed." });
  } catch (error) {
    console.error("Content API error:", error);
    sendJson(response, 500, { error: "Unable to access shared portfolio content." });
  }
}

function contentType(path) {
  const types = {
    ".css": "text/css; charset=utf-8",
    ".js": "text/javascript; charset=utf-8",
    ".html": "text/html; charset=utf-8",
    ".json": "application/json; charset=utf-8",
    ".svg": "image/svg+xml",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".webp": "image/webp",
    ".ico": "image/x-icon",
    ".pdf": "application/pdf"
  };
  return types[extname(path).toLowerCase()] || "application/octet-stream";
}

async function serveFile(request, response) {
  const requestedPath = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
  const candidate = normalize(join(publicDirectory, requestedPath === "/" ? "index.html" : requestedPath));
  const isInsideDist = relative(publicDirectory, candidate) && !relative(publicDirectory, candidate).startsWith("..") && !relative(publicDirectory, candidate).includes("..\\");
  const filePath = isInsideDist ? candidate : join(publicDirectory, "index.html");

  let resolvedPath = filePath;
  try {
    await access(resolvedPath);
    if ((await stat(resolvedPath)).isDirectory()) resolvedPath = join(publicDirectory, "index.html");
  } catch {
    resolvedPath = join(publicDirectory, "index.html");
  }

  response.writeHead(200, { "Content-Type": contentType(resolvedPath) });
  createReadStream(resolvedPath).pipe(response);
}

createServer(async (request, response) => {
  try {
    if (request.url?.split("?")[0] === "/api/content") {
      await handleContentApi(request, response);
      return;
    }
    if (request.method !== "GET" && request.method !== "HEAD") {
      sendJson(response, 405, { error: "Method not allowed." });
      return;
    }
    await serveFile(request, response);
  } catch (error) {
    console.error("Server error:", error);
    sendJson(response, 500, { error: "Internal server error." });
  }
}).listen(port, "0.0.0.0", () => {
  console.log(`Portfolio server listening on port ${port}`);
});
