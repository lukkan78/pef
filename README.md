# PEF-logg (Progressive Web App)

Detta är en enkel och snygg Progressive Web App (PWA) för att logga dina PEF-värden (Peak Expiratory Flow), inklusive beräkning av förväntat värde och jämförelse över tid.

## Funktioner

- Lägg till PEF-värden med datum och tid
- Spara bästa värdet manuellt efter 3 blåsningar
- Profilinmatning: ålder, kön och längd
- Automatisk beräkning av **förväntat PEF** enligt **Nunn & Gregg-formeln**
- Jämförelse i procent mot förväntat värde
- Stöd för **mätperioder (t.ex. 14 dagar)** med instruktioner
- Mätningar märks som **mätperiod** eller **kontrollmätning**
- Visuell graf (Chart.js) med färgkod:
  - **Röd** = mätperiod
  - **Blå** = kontrollmätning
- Filter: visa endast kontroll, endast mätperiod eller båda
- Sammanfattning med antal, min, max och medelvärde
- Export till CSV-fil
- Fungerar offline (service worker)
- Kan installeras som app på mobil (iOS/Android)

## Kom igång

1. Öppna appen i webbläsaren:  
   [https://lukkan78.github.io/pef/pef_logg.html](https://lukkan78.github.io/pef/pef_logg.html)
2. **iPhone/iPad:**
   - Öppna i Safari
   - Tryck på "Dela" → "Lägg till på hemskärmen"
3. **Android/Chrome:**
   - Tryck på "Installera app" i adressfältet

## Innehåll i projektet

- `pef_logg.html` – Huvudsidan
- `manifest.json` – PWA-konfiguration
- `service-worker.js` – Offline-stöd
- `ikon512.png` – Appikon

## Licens

Öppen källkod – använd och modifiera fritt!
