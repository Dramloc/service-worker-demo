/* eslint-env worker, serviceworker */

const cacheName = `cache-${(self.registration ? self.registration.scope : '')}`;
const urls = [
  '/',
  'app/main.css',
  'app/cards/cards.css',
  'app/side-nav/side-nav.css',
  'app/side-nav/side-nav.js',
  'app/smooth-image/smooth-image.css',
  'app/smooth-image/smooth-image.js',
  'app/timeline/timeline.css',
  'app/toolbar/toolbar.css',
  'app/toolbar/toolbar.js',
];

function cacheAll() {
  return caches.open(cacheName)
    .then((cache) => {
      cache.addAll(urls);
    });
}

function clearCache() {
  return caches.open(cacheName)
    .then(cache => cache.keys()
      .then(cacheKeys =>
        Promise.all(
          cacheKeys.map((cacheKey) => {
            if (urls.indexOf(cacheKey) === -1) {
              return cache.delete(cacheKey);
            }
            return Promise.resolve();
          }))));
}

self.addEventListener('install', (event) => {
  event.waitUntil(
    cacheAll()
      .then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    clearCache()
      .then(() => self.clients.claim()));
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.open(cacheName)
      .then(cache =>
        cache.match(event.request).then((response) => {
          if (response) {
            return response;
          }
          return fetch(event.request);
        })));
});
