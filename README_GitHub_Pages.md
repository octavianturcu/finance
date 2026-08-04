# 📱 Publicare pe GitHub Pages + PWA (aplicație pe telefon)

Acest pachet conține tot ce-ți trebuie ca aplicația să ruleze de pe GitHub Pages,
pe orice telefon/laptop, prin `https://` real, și să poată fi instalată ca aplicație
(iconiță pe ecranul principal).

## 📦 Fișiere din pachet
- `index.html` — aplicația (redenumită din FinantePersonale, cu PWA deja integrat)
- `manifest.json` — configurația PWA (nume, culori, iconițe)
- `sw.js` — service worker (necesar pentru instalare; nu cache-uiește datele)
- `icon-192.png`, `icon-512.png`, `icon-maskable-512.png` — iconițe aplicație
- `apple-touch-icon.png` — iconiță pentru iPhone/iPad
- `favicon-64.png` — iconiță filă browser

## 🚀 Pași de publicare (o singură dată)

1. Creează un repository **public** nou pe GitHub (ex. `finante`).
2. Urcă **toate** fișierele din acest pachet în rădăcina repo-ului
   (butonul „Add file" → „Upload files" → trage toate fișierele → „Commit").
3. În repo: **Settings** → **Pages** (meniul din stânga).
4. La „Source": alege branch **`main`** și folder **`/ (root)`** → **Save**.
5. Așteaptă ~1 minut. Sus apare adresa ta:
   ```
   https://UTILIZATORUL-TAU.github.io/finante/
   ```
6. Deschide acel link pe **telefon** → aplicația rulează ca site real.

## 📲 Instalare ca aplicație pe telefon
- **iPhone (Safari):** apasă butonul „Share" (□↑) → „Add to Home Screen".
- **Android (Chrome):** meniul ⋮ → „Install app" / „Add to Home screen".
- Va apărea o iconiță; aplicația se deschide fullscreen, ca una nativă.

## ✅ De ce e mai bine decât file:// sau localhost
- `https://` real → **fără** problemele de „Tracking Prevention" / localStorage
  pe care le-am avut la deschiderea directă a fișierului.
- Accesibilă de **oriunde**, nu doar pe Wi-Fi-ul de acasă.
- Datele rămân în Supabase (același cont pe toate dispozitivele).

## 🔄 Actualizări viitoare
Când primești o versiune nouă a aplicației: urci noul HTML (redenumit tot `index.html`),
faci commit, și în ~1 minut GitHub Pages se actualizează. Pe telefon, dacă ai instalat PWA,
închide și redeschide aplicația (sau reîncarcă pagina) ca să preia versiunea nouă.

---
Notă: credențialele Supabase sunt deja încorporate în `index.html` (ca înainte).
Repo-ul e public, deci oricine cu linkul vede *aplicația*, dar **datele tale sunt
protejate de login (email + parolă) și de politicile RLS din Supabase** — nimeni
nu-ți poate vedea tranzacțiile fără contul tău.
