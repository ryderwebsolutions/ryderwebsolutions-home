// basic service worker for offline support
const CACHE_NAME = 'electrician-site-v1';
const ASSETS = [
  '/',
  '/templates/tradesmen/electrician/electrician.css',
  '/templates/tradesmen/electrician/includes.js',
  '/templates/tradesmen/electrician/partials/header.html',
  '/templates/tradesmen/electrician/partials/footer.html',
  '/templates/tradesmen/electrician/partials/topbar.html',
  '/templates/tradesmen/electrician/partials/mobilecta.html'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(resp => {
      return resp || fetch(event.request);
    })
  );
});

