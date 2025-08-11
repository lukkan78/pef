# PEF – Komplett Drop-in
**Datum:** 2025-08-11

Detta är en komplett, körbar version med:
- PEF-inmatning (numeriskt fält)
- Rullande medel (7/14 dagar)
- Profil (kön, födelseår, längd) + **förväntat PEF** via EU-tabell (interpolation)
- **PDF-export** (lokalt i webbläsaren)
- **PWA** (manifest + service worker) → kan installeras på hemskärmen och funka offline

## Snabbtest
- Öppna `index.html` i webbläsare
- Lägg in ett värde → **Spara**
- Öppna **Profil** och fyll i uppgifter
- **Exportera PDF** för att ladda ner rapport
- Klicka **Installera** för att lägga till som app (Chrome/Edge/Android, iOS Safari kräver https)

## Publicering på GitHub Pages
1. Lägg in filerna i ditt repo (t.ex. i root eller `/docs`-mappen).
2. I GitHub: Settings → Pages → välj branch + rotmapp (`/root` eller `/docs`).
3. Besök din sida och testa att installera som PWA.

> Obs: Nunn & Gregg är förberedd men **inaktiv** (kräver koefficienter). EU-tabellen här är en **demotabell** för utvecklingsbruk.
