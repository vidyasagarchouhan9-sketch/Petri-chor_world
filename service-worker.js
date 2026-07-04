const CACHE_NAME = "petri-chor-v1";

const urlsToCache = [
  "./",
  "./index.html",
  "./game.html",
  "./favicon.png",
  "./petri-chor-cover.jpg",
  "./star.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});


