self.addEventListener("install", (event) => {
  // Attiva subito il nuovo SW
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  // Prende controllo immediato delle pagine
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  // IMPORTANTE:
  // non intercetta nulla, lascia che il browser gestisca tutto
  return;
});
