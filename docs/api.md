# API-Dokumentation (aus `src/` gescannt)

Diese Doku wurde automatisch aus den NestJS-Controllern im `src/`-Ordner generiert.

## Basis-URL / Versionierung

- Global Prefix: `api` (aus `main.ts`)
- URI-Versionierung aktiv, Default-Version: `v1`
- **Alle Routen beginnen daher mit:** ` /api/v1`

## Validierung / Fehlerverhalten

- Globaler `ValidationPipe` ist aktiv (`whitelist`, `forbidNonWhitelisted`, `forbidUnknownValues`, `transform`).
  - Unbekannte Felder im Body führen zu einem 400-Fehler.
  - DTOs werden typisiert/transformiert.

## Auth / Zugriffsschutz

- In `main.ts` ist ein globaler `AccessGuard` vorhanden, aber **auskommentiert**.
- **Falls** er aktiviert wird: Request-Header `x-access-key: ABC123` ist erforderlich, sonst 401/403.

## Endpoints

### Schnellübersicht

- `/api/v1/` — GET
- `/api/v1/ausstattung` — GET, POST
- `/api/v1/ausstattung/:id` — GET, PATCH, DELETE
- `/api/v1/benutzer` — GET, POST
- `/api/v1/benutzer/:id` — GET, PATCH, DELETE
- `/api/v1/bewertung` — GET, POST
- `/api/v1/bewertung/:id` — GET, PATCH, DELETE
- `/api/v1/buchung` — GET, POST
- `/api/v1/buchung-zimmer` — GET, POST
- `/api/v1/buchung-zimmer/:id` — GET, PATCH, DELETE
- `/api/v1/buchung/:id` — GET, PATCH, DELETE
- `/api/v1/health` — GET
- `/api/v1/hotel` — GET, POST
- `/api/v1/hotel-ausstattung` — GET, POST
- `/api/v1/hotel-ausstattung/:id` — GET, PATCH, DELETE
- `/api/v1/hotel-bild` — GET, POST
- `/api/v1/hotel-bild/:id` — GET, PATCH, DELETE
- `/api/v1/hotel/:id` — GET, PATCH, DELETE
- `/api/v1/hotelbesitzer` — GET, POST
- `/api/v1/hotelbesitzer/:id` — GET, PATCH, DELETE
- `/api/v1/kunde` — GET, POST
- `/api/v1/kunde/:id` — GET, PATCH, DELETE
- `/api/v1/zahlungsmethode` — GET, POST
- `/api/v1/zahlungsmethode/:id` — GET, PATCH, DELETE
- `/api/v1/zimmer` — GET, POST
- `/api/v1/zimmer-bild` — GET, POST
- `/api/v1/zimmer-bild/:id` — GET, PATCH, DELETE
- `/api/v1/zimmer/:id` — GET, PATCH, DELETE
- `/api/v1/zimmertyp` — GET, POST
- `/api/v1/zimmertyp/:id` — GET, PATCH, DELETE

### Ausstattung

- **GET** `/api/v1/ausstattung`  
  _Handler:_ `AusstattungController.findAll()` (`ausstattung/ausstattung.controller.ts`)
- **POST** `/api/v1/ausstattung` — Body: `CreateAusstattungDto`  
  _Handler:_ `AusstattungController.create()` (`ausstattung/ausstattung.controller.ts`)
- **GET** `/api/v1/ausstattung/:id` — Path-Parameter: `id` (string)  
  _Handler:_ `AusstattungController.findOne()` (`ausstattung/ausstattung.controller.ts`)
- **PATCH** `/api/v1/ausstattung/:id` — Path-Parameter: `id` (string); Body: `UpdateAusstattungDto`  
  _Handler:_ `AusstattungController.update()` (`ausstattung/ausstattung.controller.ts`)
- **DELETE** `/api/v1/ausstattung/:id` — Path-Parameter: `id` (string)  
  _Handler:_ `AusstattungController.remove()` (`ausstattung/ausstattung.controller.ts`)

### Benutzer

- **GET** `/api/v1/benutzer`  
  _Handler:_ `BenutzerController.findAll()` (`benutzer/benutzer.controller.ts`)
- **POST** `/api/v1/benutzer` — Body: `CreateBenutzerDto`  
  _Handler:_ `BenutzerController.create()` (`benutzer/benutzer.controller.ts`)
- **GET** `/api/v1/benutzer/:id` — Path-Parameter: `id` (string)  
  _Handler:_ `BenutzerController.findOne()` (`benutzer/benutzer.controller.ts`)
- **PATCH** `/api/v1/benutzer/:id` — Path-Parameter: `id` (string); Body: `UpdateBenutzerDto`  
  _Handler:_ `BenutzerController.update()` (`benutzer/benutzer.controller.ts`)
- **DELETE** `/api/v1/benutzer/:id` — Path-Parameter: `id` (string)  
  _Handler:_ `BenutzerController.remove()` (`benutzer/benutzer.controller.ts`)

### Bewertung

- **GET** `/api/v1/bewertung`  
  _Handler:_ `BewertungController.findAll()` (`bewertung/bewertung.controller.ts`)
- **POST** `/api/v1/bewertung` — Body: `CreateBewertungDto`  
  _Handler:_ `BewertungController.create()` (`bewertung/bewertung.controller.ts`)
- **GET** `/api/v1/bewertung/:id` — Path-Parameter: `id` (string)  
  _Handler:_ `BewertungController.findOne()` (`bewertung/bewertung.controller.ts`)
- **PATCH** `/api/v1/bewertung/:id` — Path-Parameter: `id` (string); Body: `UpdateBewertungDto`  
  _Handler:_ `BewertungController.update()` (`bewertung/bewertung.controller.ts`)
- **DELETE** `/api/v1/bewertung/:id` — Path-Parameter: `id` (string)  
  _Handler:_ `BewertungController.remove()` (`bewertung/bewertung.controller.ts`)

### BuchungZimmer

- **GET** `/api/v1/buchung-zimmer`  
  _Handler:_ `BuchungZimmerController.findAll()` (`buchung-zimmer/buchung-zimmer.controller.ts`)
- **POST** `/api/v1/buchung-zimmer` — Body: `CreateBuchungZimmerDto`  
  _Handler:_ `BuchungZimmerController.create()` (`buchung-zimmer/buchung-zimmer.controller.ts`)
- **GET** `/api/v1/buchung-zimmer/:id` — Path-Parameter: `id` (string)  
  _Handler:_ `BuchungZimmerController.findOne()` (`buchung-zimmer/buchung-zimmer.controller.ts`)
- **PATCH** `/api/v1/buchung-zimmer/:id` — Path-Parameter: `id` (string); Body: `UpdateBuchungZimmerDto`  
  _Handler:_ `BuchungZimmerController.update()` (`buchung-zimmer/buchung-zimmer.controller.ts`)
- **DELETE** `/api/v1/buchung-zimmer/:id` — Path-Parameter: `id` (string)  
  _Handler:_ `BuchungZimmerController.remove()` (`buchung-zimmer/buchung-zimmer.controller.ts`)

### Buchung

- **GET** `/api/v1/buchung`  
  _Handler:_ `BuchungController.findAll()` (`buchung/buchung.controller.ts`)
- **POST** `/api/v1/buchung` — Body: `CreateBuchungDto`  
  _Handler:_ `BuchungController.create()` (`buchung/buchung.controller.ts`)
- **GET** `/api/v1/buchung/:id` — Path-Parameter: `id` (string)  
  _Handler:_ `BuchungController.findOne()` (`buchung/buchung.controller.ts`)
- **PATCH** `/api/v1/buchung/:id` — Path-Parameter: `id` (string); Body: `UpdateBuchungDto`  
  _Handler:_ `BuchungController.update()` (`buchung/buchung.controller.ts`)
- **DELETE** `/api/v1/buchung/:id` — Path-Parameter: `id` (string)  
  _Handler:_ `BuchungController.remove()` (`buchung/buchung.controller.ts`)

### HotelAusstattung

- **GET** `/api/v1/hotel-ausstattung`  
  _Handler:_ `HotelAusstattungController.findAll()` (`hotel-ausstattung/hotel-ausstattung.controller.ts`)
- **POST** `/api/v1/hotel-ausstattung` — Body: `CreateHotelAusstattungDto`  
  _Handler:_ `HotelAusstattungController.create()` (`hotel-ausstattung/hotel-ausstattung.controller.ts`)
- **GET** `/api/v1/hotel-ausstattung/:id` — Path-Parameter: `id` (string)  
  _Handler:_ `HotelAusstattungController.findOne()` (`hotel-ausstattung/hotel-ausstattung.controller.ts`)
- **PATCH** `/api/v1/hotel-ausstattung/:id` — Path-Parameter: `id` (string); Body: `UpdateHotelAusstattungDto`  
  _Handler:_ `HotelAusstattungController.update()` (`hotel-ausstattung/hotel-ausstattung.controller.ts`)
- **DELETE** `/api/v1/hotel-ausstattung/:id` — Path-Parameter: `id` (string)  
  _Handler:_ `HotelAusstattungController.remove()` (`hotel-ausstattung/hotel-ausstattung.controller.ts`)

### HotelBild

- **GET** `/api/v1/hotel-bild`  
  _Handler:_ `HotelBildController.findAll()` (`hotel-bild/hotel-bild.controller.ts`)
- **POST** `/api/v1/hotel-bild` — Body: `CreateHotelBildDto`  
  _Handler:_ `HotelBildController.create()` (`hotel-bild/hotel-bild.controller.ts`)
- **GET** `/api/v1/hotel-bild/:id` — Path-Parameter: `id` (string)  
  _Handler:_ `HotelBildController.findOne()` (`hotel-bild/hotel-bild.controller.ts`)
- **PATCH** `/api/v1/hotel-bild/:id` — Path-Parameter: `id` (string); Body: `UpdateHotelBildDto`  
  _Handler:_ `HotelBildController.update()` (`hotel-bild/hotel-bild.controller.ts`)
- **DELETE** `/api/v1/hotel-bild/:id` — Path-Parameter: `id` (string)  
  _Handler:_ `HotelBildController.remove()` (`hotel-bild/hotel-bild.controller.ts`)

### Hotel

- **GET** `/api/v1/hotel`  
  _Handler:_ `HotelController.findAll()` (`hotel/hotel.controller.ts`)
- **POST** `/api/v1/hotel` — Body: `CreateHotelDto`  
  _Handler:_ `HotelController.create()` (`hotel/hotel.controller.ts`)
- **GET** `/api/v1/hotel/:id` — Path-Parameter: `id` (string)  
  _Handler:_ `HotelController.findOne()` (`hotel/hotel.controller.ts`)
- **PATCH** `/api/v1/hotel/:id` — Path-Parameter: `id` (string); Body: `UpdateHotelDto`  
  _Handler:_ `HotelController.update()` (`hotel/hotel.controller.ts`)
- **DELETE** `/api/v1/hotel/:id` — Path-Parameter: `id` (string)  
  _Handler:_ `HotelController.remove()` (`hotel/hotel.controller.ts`)

### Hotelbesitzer

- **GET** `/api/v1/hotelbesitzer`  
  _Handler:_ `HotelbesitzerController.findAll()` (`hotelbesitzer/hotelbesitzer.controller.ts`)
- **POST** `/api/v1/hotelbesitzer` — Body: `CreateHotelbesitzerDto`  
  _Handler:_ `HotelbesitzerController.create()` (`hotelbesitzer/hotelbesitzer.controller.ts`)
- **GET** `/api/v1/hotelbesitzer/:id` — Path-Parameter: `id` (string)  
  _Handler:_ `HotelbesitzerController.findOne()` (`hotelbesitzer/hotelbesitzer.controller.ts`)
- **PATCH** `/api/v1/hotelbesitzer/:id` — Path-Parameter: `id` (string); Body: `UpdateHotelbesitzerDto`  
  _Handler:_ `HotelbesitzerController.update()` (`hotelbesitzer/hotelbesitzer.controller.ts`)
- **DELETE** `/api/v1/hotelbesitzer/:id` — Path-Parameter: `id` (string)  
  _Handler:_ `HotelbesitzerController.remove()` (`hotelbesitzer/hotelbesitzer.controller.ts`)

### Kunde

- **GET** `/api/v1/kunde`  
  _Handler:_ `KundeController.findAll()` (`kunde/kunde.controller.ts`)
- **POST** `/api/v1/kunde` — Body: `CreateKundeDto`  
  _Handler:_ `KundeController.create()` (`kunde/kunde.controller.ts`)
- **GET** `/api/v1/kunde/:id` — Path-Parameter: `id` (string)  
  _Handler:_ `KundeController.findOne()` (`kunde/kunde.controller.ts`)
- **PATCH** `/api/v1/kunde/:id` — Path-Parameter: `id` (string); Body: `UpdateKundeDto`  
  _Handler:_ `KundeController.update()` (`kunde/kunde.controller.ts`)
- **DELETE** `/api/v1/kunde/:id` — Path-Parameter: `id` (string)  
  _Handler:_ `KundeController.remove()` (`kunde/kunde.controller.ts`)

### Zahlungsmethode

- **GET** `/api/v1/zahlungsmethode`  
  _Handler:_ `ZahlungsmethodeController.findAll()` (`zahlungsmethode/zahlungsmethode.controller.ts`)
- **POST** `/api/v1/zahlungsmethode` — Body: `CreateZahlungsmethodeDto`  
  _Handler:_ `ZahlungsmethodeController.create()` (`zahlungsmethode/zahlungsmethode.controller.ts`)
- **GET** `/api/v1/zahlungsmethode/:id` — Path-Parameter: `id` (string)  
  _Handler:_ `ZahlungsmethodeController.findOne()` (`zahlungsmethode/zahlungsmethode.controller.ts`)
- **PATCH** `/api/v1/zahlungsmethode/:id` — Path-Parameter: `id` (string); Body: `UpdateZahlungsmethodeDto`  
  _Handler:_ `ZahlungsmethodeController.update()` (`zahlungsmethode/zahlungsmethode.controller.ts`)
- **DELETE** `/api/v1/zahlungsmethode/:id` — Path-Parameter: `id` (string)  
  _Handler:_ `ZahlungsmethodeController.remove()` (`zahlungsmethode/zahlungsmethode.controller.ts`)

### ZimmerBild

- **GET** `/api/v1/zimmer-bild`  
  _Handler:_ `ZimmerBildController.findAll()` (`zimmer-bild/zimmer-bild.controller.ts`)
- **POST** `/api/v1/zimmer-bild` — Body: `CreateZimmerBildDto`  
  _Handler:_ `ZimmerBildController.create()` (`zimmer-bild/zimmer-bild.controller.ts`)
- **GET** `/api/v1/zimmer-bild/:id` — Path-Parameter: `id` (string)  
  _Handler:_ `ZimmerBildController.findOne()` (`zimmer-bild/zimmer-bild.controller.ts`)
- **PATCH** `/api/v1/zimmer-bild/:id` — Path-Parameter: `id` (string); Body: `UpdateZimmerBildDto`  
  _Handler:_ `ZimmerBildController.update()` (`zimmer-bild/zimmer-bild.controller.ts`)
- **DELETE** `/api/v1/zimmer-bild/:id` — Path-Parameter: `id` (string)  
  _Handler:_ `ZimmerBildController.remove()` (`zimmer-bild/zimmer-bild.controller.ts`)

### Zimmer

- **GET** `/api/v1/zimmer`  
  _Handler:_ `ZimmerController.findAll()` (`zimmer/zimmer.controller.ts`)
- **POST** `/api/v1/zimmer` — Body: `CreateZimmerDto`  
  _Handler:_ `ZimmerController.create()` (`zimmer/zimmer.controller.ts`)
- **GET** `/api/v1/zimmer/:id` — Path-Parameter: `id` (string)  
  _Handler:_ `ZimmerController.findOne()` (`zimmer/zimmer.controller.ts`)
- **PATCH** `/api/v1/zimmer/:id` — Path-Parameter: `id` (string); Body: `UpdateZimmerDto`  
  _Handler:_ `ZimmerController.update()` (`zimmer/zimmer.controller.ts`)
- **DELETE** `/api/v1/zimmer/:id` — Path-Parameter: `id` (string)  
  _Handler:_ `ZimmerController.remove()` (`zimmer/zimmer.controller.ts`)

### Zimmertyp

- **GET** `/api/v1/zimmertyp`  
  _Handler:_ `ZimmertypController.findAll()` (`zimmertyp/zimmertyp.controller.ts`)
- **POST** `/api/v1/zimmertyp` — Body: `CreateZimmertypDto`  
  _Handler:_ `ZimmertypController.create()` (`zimmertyp/zimmertyp.controller.ts`)
- **GET** `/api/v1/zimmertyp/:id` — Path-Parameter: `id` (string)  
  _Handler:_ `ZimmertypController.findOne()` (`zimmertyp/zimmertyp.controller.ts`)
- **PATCH** `/api/v1/zimmertyp/:id` — Path-Parameter: `id` (string); Body: `UpdateZimmertypDto`  
  _Handler:_ `ZimmertypController.update()` (`zimmertyp/zimmertyp.controller.ts`)
- **DELETE** `/api/v1/zimmertyp/:id` — Path-Parameter: `id` (string)  
  _Handler:_ `ZimmertypController.remove()` (`zimmertyp/zimmertyp.controller.ts`)
