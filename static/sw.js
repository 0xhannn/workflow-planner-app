/* Workflow Planner PWA service worker — minimal cache for installability + offline shell */
const CACHE = 'workflow-pwa-v2-phpromo';
const PRECACHE = [
  '/',
  '/inwork',
  '/static/manifest.webmanifest',
  '/manifest.webmanifest',
  '/static/favicon.ico',
  '/static/favicon-32.png',
  '/static/apple-touch-icon.png',
  '/static/img/pwa/icon-192.png',
  '/static/img/pwa/icon-512.png',
  '/static/img/workflow-logo-64.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(PRECACHE).catch(() => {})).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // Promo + banners: always network-first (never sticky-cache ads/update)
  if (
    url.pathname.indexOf('ph-promo') !== -1 ||
    url.pathname.indexOf('update-banner') !== -1
  ) {
    event.respondWith(
      fetch(req).then((res) => res).catch(() => caches.match(req))
    );
    return;
  }
  // Network-first for HTML/API so app stays fresh; cache-first for static icons
  if (url.pathname.startsWith('/static/')) {
    event.respondWith(
      caches.match(req).then((hit) => hit || fetch(req).then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => {});
        return res;
      }).catch(() => caches.match(req)))
    );
    return;
  }
  // HTML navigations: network first
  if (req.mode === 'navigate' || (req.headers.get('accept') || '').includes('text/html')) {
    event.respondWith(
      fetch(req).then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => {});
        return res;
      }).catch(() => caches.match(req).then((hit) => hit || caches.match('/')))
    );
  }
});
