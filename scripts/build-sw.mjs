import { readdir, readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { appBasePath } from './app-path.mjs';

const base = appBasePath(process.env.APP_BASE_PATH || '/');
const assets = (await readdir('dist/assets')).sort().map(name => `assets/${name}`);
const paths = ['index.html', 'icon.svg', 'icon-192.png', 'icon-512.png', 'manifest.webmanifest', 'lernplan-original.xlsx', 'lernbibliothek-original.json', 'licenses/dm-sans.txt', 'licenses/react.txt', 'licenses/lucide-react.txt', ...assets];
// Include all public content, not only the HTML and hashed bundle names.
// A changed source download or manifest must also offer an offline update.
const hash = createHash('sha256').update(base);
for (const path of paths) hash.update(path).update(await readFile(`dist/${path}`));
const version = hash.digest('hex').slice(0, 12);
const prefix = `ki-kompass-static-v3-${createHash('sha256').update(base).digest('hex').slice(0, 8)}-`;
const files = [base, ...paths.map(path => base + path)];
const worker = `
const PREFIX = ${JSON.stringify(prefix)};
const CACHE = PREFIX + '${version}';
const BASE = ${JSON.stringify(base)};
const FILES = ${JSON.stringify(files)};
const PATHS = new Set(FILES);
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(FILES)));
});
self.addEventListener('message', event => {
  if (event.data === 'ACTIVATE_UPDATE') self.skipWaiting();
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => (k.startsWith(PREFIX) || (BASE === '/' && k.startsWith('ki-kompass-static-v2-'))) && k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== self.location.origin || !url.pathname.startsWith(BASE)) return;
  if (request.mode === 'navigate') {
    event.respondWith(fetch(request).catch(async () => (await caches.open(CACHE)).match(BASE + 'index.html', { ignoreVary: true })));
  } else {
    const path = new URL(request.url).pathname;
    if (!PATHS.has(path)) return;
    // All entries are public static build artifacts. Dev/preview hosts can set
    // Vary: Origin, while module/font requests add Origin after precaching.
    // Restrict this override to explicit build files in this version's cache.
    event.respondWith(caches.open(CACHE).then(cache => cache.match(path, { ignoreVary: true })).then(cached => cached || fetch(request)));
  }
});
`;
await writeFile('dist/sw.js', worker.trim());
await writeFile('dist/.nojekyll', '');
console.log(`Offline-Cache: ${files.length} Dateien, Pfad ${base}, Version ${version}`);
