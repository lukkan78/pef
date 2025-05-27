
self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("pef-cache").then(cache => {
      return cache.addAll([
        "pef_logg.html",
        "manifest.json",
        "ikon512.png"
      ]);
    })
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
});
