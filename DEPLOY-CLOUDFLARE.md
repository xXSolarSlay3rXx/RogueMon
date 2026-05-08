# RogueMon kostenlos online stellen

Diese Variante stellt **Spiel und Cloudsave kostenlos** ueber **Cloudflare Pages + Pages Functions + D1** bereit.

## Was du am Ende hast

- das Spiel online unter deiner Pages-URL oder eigenen Domain
- Cloudsave direkt unter derselben Seite ueber `/api`
- kein externer Pokelike-Bezug mehr

## Projektstruktur

Fuer den Online-Deploy nutzt RogueMon jetzt:

- statische Spiel-Dateien im Projektroot
- API-Endpunkte in [functions/api](</D:/Visual Studio Code/pokemon-roguelike/functions/api>)
- D1-Datenbankschema in [cloudflare/d1-schema.sql](</D:/Visual Studio Code/pokemon-roguelike/cloudflare/d1-schema.sql>)

## 1. Code nach GitHub pushen

Lege das Projekt in ein GitHub-Repository.

## 2. Cloudflare Pages Projekt erstellen

In Cloudflare:

1. `Workers & Pages`
2. `Create application`
3. `Pages`
4. GitHub-Repo verbinden

Empfohlene Einstellungen:

- `Build command`: leer lassen oder kein Build
- `Build output directory`: `.`

## 3. D1 Datenbank anlegen

In Cloudflare:

1. `D1`
2. `Create database`
3. Name z. B. `roguemon-cloud`

Danach das SQL aus [cloudflare/d1-schema.sql](</D:/Visual Studio Code/pokemon-roguelike/cloudflare/d1-schema.sql>) in die Datenbank ausfuehren.

## 4. D1 an dein Pages-Projekt binden

Im Pages-Projekt:

1. `Settings`
2. `Bindings`
3. `Add binding`
4. Typ: `D1 database`
5. Variablenname: `DB`
6. deine `roguemon-cloud` Datenbank waehlen

Das ist wichtig, weil die API-Dateien in [functions/api](</D:/Visual Studio Code/pokemon-roguelike/functions/api>) auf `env.DB` zugreifen.

## 5. Neu deployen

Nach der D1-Bindung das Projekt neu deployen.

Dann sind diese Endpunkte live:

- `/api/register`
- `/api/login`
- `/api/save/:uuid`

## 6. Im Spiel nutzen

RogueMon ist jetzt so vorbereitet, dass auf HTTP/HTTPS standardmaessig dieselbe Seite als API verwendet wird.

Das heisst:

- auf Cloudflare Pages sollte `RogueMon Cloud` direkt mit `/api` arbeiten
- falls du es manuell setzen willst: in den Settings einfach `/api` als Server eintragen

## 7. Lokaler Fallback bleibt erhalten

Falls du lokal testen willst, gibt es weiter den Node-Server:

```powershell
node .\server\roguemon-cloud-save-server.js
```

Dann lokal im Spiel als Server:

```text
http://localhost:8787
```

## Wichtige Dateien

- Frontend-Cloudlogik: [roguemon-cloud-save.js](</D:/Visual Studio Code/pokemon-roguelike/roguemon-cloud-save.js>)
- Lokaler Save-Server: [server/roguemon-cloud-save-server.js](</D:/Visual Studio Code/pokemon-roguelike/server/roguemon-cloud-save-server.js>)
- Cloudflare API:
  - [functions/api/register.js](</D:/Visual Studio Code/pokemon-roguelike/functions/api/register.js>)
  - [functions/api/login.js](</D:/Visual Studio Code/pokemon-roguelike/functions/api/login.js>)
  - [functions/api/save/[uuid].js](</D:/Visual Studio Code/pokemon-roguelike/functions/api/save/[uuid].js>)

## Kosten / Free Tier

Cloudflare hat kostenlose Einstiege fuer:

- Pages / statische Sites
- Workers / Functions
- D1

Offizielle Infos:

- [Cloudflare Pages](https://developers.cloudflare.com/pages/)
- [Cloudflare Workers Pricing](https://developers.cloudflare.com/workers/platform/pricing/)
- [Cloudflare D1 Pricing](https://developers.cloudflare.com/d1/platform/pricing/)
- [D1 in Pages Functions binden](https://developers.cloudflare.com/pages/functions/bindings/#d1-databases)

## Mein Rat

Wenn du willst, ist der naechste sinnvolle Schritt:

1. ich bereite dir noch ein kleines `README` fuer GitHub auf
2. danach gehen wir gemeinsam die Cloudflare-Einrichtung Punkt fuer Punkt durch
3. und am Ende pruefen wir die Live-URL zusammen
