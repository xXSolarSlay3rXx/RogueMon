# RogueMon Cloud Save Server

This server gives RogueMon its own save backend, without any dependency on external services.

## Start

```powershell
node .\server\roguemon-cloud-save-server.js
```

By default it runs on:

```text
http://localhost:8787
```

## In-Game Setup

1. Start the server.
2. Open RogueMon.
3. Go to `Settings`.
4. Open `RogueMon Cloud`.
5. Enter `http://localhost:8787` as the server URL.
6. Register a new account or log in.

## Optional Environment Variables

```powershell
$env:PORT=8787
$env:ROGUEMON_SAVE_DATA_DIR="D:\RogueMonSaveData"
$env:ROGUEMON_SAVE_ORIGIN="*"
node .\server\roguemon-cloud-save-server.js
```

## Endpoints

- `POST /register`
- `POST /login`
- `GET /save/:uuid`
- `POST /save/:uuid`

The frontend in RogueMon already matches this API.
