# Memorably – Datenbankprojekt

## Voraussetzungen

* Docker Desktop installiert
* Docker gestartet
* Node.js installiert

---

## Datenbank starten

Im Repo-Root:

```bash
docker compose up -d
```

DB läuft dann auf:

* Host: localhost
* Port: 5432
* Database: bookingdb
* User: booking
* Password: booking

---

## Wichtig bei Schema-Änderungen

`schema.sql` wird nur beim ersten Start ausgeführt.

Wenn das Schema geändert wurde:

```bash
docker compose down -v
docker compose up -d
```

`-v` löscht das Datenbank-Volume.

---

## Backend starten

```bash
cd backend
npm install
npm run start:dev
```

Health-Check:

```
http://localhost:3000/api/v1/health
```

---

## Frontend starten

```bash
cd frontend
npm install
npm run dev
```

---

