/* Service Worker minimal — doar pentru instalare PWA (Add to Home Screen).
   IMPORTANT: aplicația e "server-authoritative" (datele vin din Supabase),
   așa că NU cache-uim datele. Cache-uim doar shell-ul pentru pornire rapidă
   și pentru a satisface cerința PWA de a avea un SW înregistrat.
   Strategie: network-first, cu fallback la cache dacă ești offline. */
const CACHE = "fp-shell-v1";
const SHELL = ["./", "./index.html", "./manifest.json", "./icon-192.png", "./icon-512.png"];

self.addEventListener("install", (e) => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL).catch(() => {})));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  // Nu interceptăm cererile către Supabase / CDN — mereu direct din rețea.
  const url = req.url;
  if (url.includes("supabase.co") || url.includes("cdn.jsdelivr.net") || req.method !== "GET") {
    return; // lasă browserul să le trateze normal
  }
  // Shell: network-first, fallback la cache (pentru offline).
  e.respondWith(
    fetch(req)
      .then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => {});
        return res;
      })
      .catch(() => caches.match(req).then((r) => r || caches.match("./index.html")))
  );
});
