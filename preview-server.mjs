import { createServer } from "node:http";
import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import path from "node:path";

const host = "127.0.0.1";
const port = Number.parseInt(process.env.PORT ?? "4173", 10);
const rootDir = process.cwd();

const contentTypes = {
    ".css": "text/css; charset=utf-8",
    ".html": "text/html; charset=utf-8",
    ".ico": "image/x-icon",
    ".jpg": "image/jpeg",
    ".js": "application/javascript; charset=utf-8",
    ".json": "application/json; charset=utf-8",
    ".png": "image/png",
    ".svg": "image/svg+xml; charset=utf-8",
    ".txt": "text/plain; charset=utf-8"
};

function sendResponse(response, statusCode, contentType, body) {
    response.writeHead(statusCode, { "Content-Type": contentType });
    response.end(body);
}

function resolveFilePath(urlPathname) {
    const decodedPath = decodeURIComponent(urlPathname);
    const requestedPath = decodedPath === "/" ? "/index.html" : decodedPath;
    const normalizedPath = path.normalize(requestedPath).replace(/^(\.\.[/\\])+/, "");
    const absolutePath = path.resolve(rootDir, `.${normalizedPath}`);

    if (!absolutePath.startsWith(rootDir)) {
        return null;
    }

    return absolutePath;
}

const server = createServer(async (request, response) => {
    try {
        const requestUrl = new URL(request.url ?? "/", `http://${host}:${port}`);
        let filePath = resolveFilePath(requestUrl.pathname);

        if (!filePath) {
            sendResponse(response, 403, "text/plain; charset=utf-8", "Forbidden");
            return;
        }

        let fileStats = await stat(filePath);
        if (fileStats.isDirectory()) {
            filePath = path.join(filePath, "index.html");
            fileStats = await stat(filePath);
        }

        const extension = path.extname(filePath).toLowerCase();
        const contentType = contentTypes[extension] ?? "application/octet-stream";

        response.writeHead(200, {
            "Content-Length": fileStats.size,
            "Content-Type": contentType
        });

        createReadStream(filePath).pipe(response);
    } catch (error) {
        if (error && typeof error === "object" && "code" in error && error.code === "ENOENT") {
            sendResponse(response, 404, "text/plain; charset=utf-8", "Not Found");
            return;
        }

        sendResponse(response, 500, "text/plain; charset=utf-8", "Internal Server Error");
    }
});

server.listen(port, host, () => {
    console.log(`Preview server running at http://${host}:${port}/`);
});
