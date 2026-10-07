import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { dirname, extname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { appBasePath } from './app-path.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const html = await readFile(resolve(root, 'index.html'), 'utf8');
const base = appBasePath(html.match(/href="([^"\s]*)manifest\.webmanifest"/)?.[1]);
const port = Number(process.env.PORT || 4173);
const types = { '.html': 'text/html; charset=utf-8', '.js': 'application/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8', '.webmanifest': 'application/manifest+json', '.svg': 'image/svg+xml', '.png': 'image/png', '.woff': 'font/woff', '.woff2': 'font/woff2', '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' };
createServer(async (request, response) => {
  try {
    if (request.method !== 'GET' && request.method !== 'HEAD') { response.writeHead(405, { Allow: 'GET, HEAD' }); response.end(); return; }
    const url = new URL(request.url, `http://localhost:${port}`);
    const pathname = decodeURIComponent(url.pathname);
    if (base !== '/' && (pathname === '/' || pathname === base.slice(0, -1))) {
      response.writeHead(302, { Location: base + url.search, 'Cache-Control': 'no-cache' }); response.end(); return;
    }
    if (!pathname.startsWith(base)) { response.writeHead(404); response.end('Datei nicht gefunden.'); return; }
    const relativePath = pathname.slice(base.length) || 'index.html';
    const path = resolve(root, relativePath);
    if (!path.startsWith(root + sep)) { response.writeHead(403); response.end('Zugriff nicht erlaubt.'); return; }
    if (!(await stat(path)).isFile()) { response.writeHead(404); response.end('Datei nicht gefunden.'); return; }
    const body = await readFile(path);
    response.writeHead(200, { 'Content-Type': types[extname(path)] || 'application/octet-stream', 'X-Content-Type-Options': 'nosniff', 'Cache-Control': extname(path) === '.html' || relativePath === 'sw.js' ? 'no-cache' : 'public, max-age=3600' });
    response.end(request.method === 'HEAD' ? undefined : body);
  } catch { response.writeHead(404); response.end('Datei nicht gefunden. Bitte die App zuerst bauen.'); }
}).listen(port, '0.0.0.0', () => console.log(`KI Kompass läuft auf http://localhost:${port}${base}. Mit Strg+C beenden.`));
