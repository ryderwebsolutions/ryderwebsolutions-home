// sw.js — White Lotus Thai Massage — minimal service worker
self.addEventListener('install', function(e) { self.skipWaiting(); });
self.addEventListener('activate', function(e) { e.waitUntil(self.clients.claim()); });
self.addEventListener('fetch', function(e) { /* no-op cache strategy */ });
