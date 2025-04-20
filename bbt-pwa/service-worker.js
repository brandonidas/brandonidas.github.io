const CACHE_NAME = "big-button-timer-v1";
const FILES_TO_CACHE = [
  "/bbt-pwa/",
  "/bbt-pwa/index.html",
  "/bbt-pwa/manifest.json",
  "/bbt-pwa/service-worker.js",
  "/bbt-pwa/icons/icon-192.png",
  "/bbt-pwa/icons/icon-512.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_CACHE)),
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((res) => res || fetch(event.request)),
  );
});
