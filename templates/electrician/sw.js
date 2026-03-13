// basic service worker for offline support
const CACHE_NAME = 'electrician-site-v1';
const ASSETS = [
  '/',
  '/templates/electrician/electrician.css',
  '/templates/electrician/includes.js',
  '/templates/electrician/partials/header.html',
  '/templates/electrician/partials/footer.html',
  '/templates/electrician/partials/topbar.html',
  '/templates/electrician/partials/mobilecta.html'
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

