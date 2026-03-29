// basic service worker for offline support
const CACHE_NAME = 'plumber-site-v1';
const ASSETS = [
  '/',
  '/templates/tradesmen/plumber/plumber.css',
  '/templates/tradesmen/plumber/includes.js',
  '/templates/tradesmen/plumber/partials/header.html',
  '/templates/tradesmen/plumber/partials/footer.html',
  '/templates/tradesmen/plumber/partials/topbar.html',
  '/templates/tradesmen/plumber/partials/mobilecta.html'
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
