// basic service worker for offline support
const CACHE_NAME = 'plumber-site-v1';
const ASSETS = [
  '/',
  '/templates/plumber/plumber.css',
  '/templates/plumber/includes.js',
  '/templates/plumber/partials/header.html',
  '/templates/plumber/partials/footer.html',
  '/templates/plumber/partials/topbar.html',
  '/templates/plumber/partials/mobilecta.html'
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
