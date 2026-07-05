const CACHE_NAME = "petri-chor-v2";

const urlsToCache = [
  "./",
  "./index.html",

  "./act1.html",
  "./act2.html",
  "./act3.html",
  "./act4.html",
  "./act5.html",
  "./act6.html",
  "./act7.html",
  "./act8.html",
  "./act9.html",
  "./act10.html",
  "./act11.html",
  "./act12.html",
  "./act13.html",

  "./reward.html",
  "./game(1).html",

  "./favicon.ico",
  "./favicon.png",
  "./petri-chor-cover.jpg",
  "./star.png"
];

// Install Service Worker
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Activate Service Worker
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      )
    )
  );
});

// Fetch Files
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
