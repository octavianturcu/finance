/* Service Worker minimal — pentru instalare PWA (Add to Home Screen).
   Aplicația e server-authoritative (datele vin din Supabase), deci NU cache-uim date.
   Cache doar shell-ul pentru pornire rapidă. Network-first cu fallback la cache. */
const CACHE = "fp-shell-v1";
const SHELL = ["./", "./index.html", "./manifest.json", "./icon-192.png", "./icon-512.png"];
self.addEventListener("install", (e) => { self.skipWaiting(); e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL).catch(() => {}))); });
self.addEventListener("activate", (e) => { e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.url.includes("supabase.co") || req.url.includes("cdn.jsdelivr.net") || req.method !== "GET") return;
  e.respondWith(fetch(req).then((res) => { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => {}); return res; }).catch(() => caches.match(req).then((r) => r || caches.match("./index.html"))));
});
