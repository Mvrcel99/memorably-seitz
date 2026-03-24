# Memorably – Lokales Setup

## Voraussetzungen

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installiert und gestartet

---

## Starten

Im Repo-Root:
```bash
docker compose up -d
```

Beim ersten Start werden alle Images gebaut – das dauert ca. 2–3 Minuten.

---

## Zugriff

| Dienst     | URL                        |
|------------|----------------------------|
| Frontend   | http://localhost           |
| Backend    | http://localhost/api/v1    |
| pgAdmin    | http://localhost:5050      |

---

## Stoppen
```bash
docker compose down
```

---

## Datenbank zurücksetzen

Falls die Datenbank neu initialisiert werden soll (z.B. nach Schema-Änderungen):
```bash
docker compose down -v
docker compose up -d
```
