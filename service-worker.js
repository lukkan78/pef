
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open('pef-cache').then(function(cache) {
      return cache.addAll([
        'pef_logg.html',
        'manifest.json',
        'ikon512.png',
        'https://cdn.jsdelivr.net/npm/chart.js'
      ]);
    })
  );
});

self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
