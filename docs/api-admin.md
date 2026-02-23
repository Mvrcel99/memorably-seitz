> Basis: euer Admin-Modul
>
> * `GET /admin/:table` (Liste)
> * `POST /admin/:table` (Insert)
> * `PATCH /admin/:table` mit Body `{ keys, data }` (Update)
> * `DELETE /admin/:table` mit Body `{ keys }` (Delete)

---

# `benutzer`

| Method | API Call                 | Request JSON                                                                                                                    | Response JSON                                                                                                                                              |
| ------ | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| GET    | `/api/v1/admin/benutzer` | –                                                                                                                               | `[{ "benutzer_id": 1, "email": "...", ... }]`                                                                                                              |
| POST   | `/api/v1/admin/benutzer` | `json { "email":"neu@test.de","vorname":"Nina","nachname":"Neu","land":"DE","strasse":"Testweg 1","plz":"89073","ort":"Ulm" } ` | `json { "benutzer_id": 7, "email":"neu@test.de","vorname":"Nina","nachname":"Neu","land":"DE","strasse":"Testweg 1","plz":"89073","ort":"Ulm" } `          |
| PATCH  | `/api/v1/admin/benutzer` | `json { "keys": { "benutzer_id": 7 }, "data": { "ort": "Heidenheim", "strasse": "Neue Str. 9" } } `                             | `json { "benutzer_id": 7, "email":"neu@test.de","vorname":"Nina","nachname":"Neu","land":"DE","strasse":"Neue Str. 9","plz":"89073","ort":"Heidenheim" } ` |
| DELETE | `/api/v1/admin/benutzer` | `json { "keys": { "benutzer_id": 7 } } `                                                                                        | `json { "benutzer_id": 7, "email":"neu@test.de","vorname":"Nina","nachname":"Neu","land":"DE","strasse":"Neue Str. 9","plz":"89073","ort":"Heidenheim" } ` |

---

# `kunde`

| Method | API Call              | Request JSON                                      | Response JSON                                  |
| ------ | --------------------- | ------------------------------------------------- | ---------------------------------------------- |
| GET    | `/api/v1/admin/kunde` | –                                                 | `[{ "benutzer_id": 1 }, { "benutzer_id": 2 }]` |
| POST   | `/api/v1/admin/kunde` | `json { "benutzer_id": 1 } `                      | `json { "benutzer_id": 1 } `                   |
| PATCH  | – (nicht sinnvoll)    | (würde 400 liefern, weil keine updatable Spalten) | –                                              |
| DELETE | `/api/v1/admin/kunde` | `json { "keys": { "benutzer_id": 1 } } `          | `json { "benutzer_id": 1 } `                   |

> Hinweis: Bei `kunde` ist Update fachlich Quatsch (nur PK). “Rolle entfernen” = Delete.

---

# `hotelbesitzer`

| Method | API Call                      | Request JSON                                      | Response JSON                                  |
| ------ | ----------------------------- | ------------------------------------------------- | ---------------------------------------------- |
| GET    | `/api/v1/admin/hotelbesitzer` | –                                                 | `[{ "benutzer_id": 5 }, { "benutzer_id": 6 }]` |
| POST   | `/api/v1/admin/hotelbesitzer` | `json { "benutzer_id": 6 } `                      | `json { "benutzer_id": 6 } `                   |
| PATCH  | – (nicht sinnvoll)            | (würde 400 liefern, weil keine updatable Spalten) | –                                              |
| DELETE | `/api/v1/admin/hotelbesitzer` | `json { "keys": { "benutzer_id": 6 } } `          | `json { "benutzer_id": 6 } `                   |

---

# `ausstattung`

| Method | API Call                    | Request JSON                                                                             | Response JSON                                                                                              |
| ------ | --------------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| GET    | `/api/v1/admin/ausstattung` | –                                                                                        | `[{ "ausstattung_id": 1, "titel":"WLAN", "beschreibung":"..." }]`                                          |
| POST   | `/api/v1/admin/ausstattung` | `json { "titel": "Klimaanlage", "beschreibung": "Zimmer mit Klimaanlage" } `             | `json { "ausstattung_id": 10, "titel": "Klimaanlage", "beschreibung": "Zimmer mit Klimaanlage" } `         |
| PATCH  | `/api/v1/admin/ausstattung` | `json { "keys": { "ausstattung_id": 10 }, "data": { "titel": "Klimaanlage (inkl.)" } } ` | `json { "ausstattung_id": 10, "titel": "Klimaanlage (inkl.)", "beschreibung": "Zimmer mit Klimaanlage" } ` |
| DELETE | `/api/v1/admin/ausstattung` | `json { "keys": { "ausstattung_id": 10 } } `                                             | `json { "ausstattung_id": 10, "titel": "Klimaanlage (inkl.)", "beschreibung": "Zimmer mit Klimaanlage" } ` |

---

# `zimmertyp`

| Method | API Call                  | Request JSON                                                                    | Response JSON                                           |
| ------ | ------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------- |
| GET    | `/api/v1/admin/zimmertyp` | –                                                                               | `[{ "id": 1, "bezeichnung":"Einzelzimmer" }]`           |
| POST   | `/api/v1/admin/zimmertyp` | `json { "bezeichnung": "Familienzimmer" } `                                     | `json { "id": 9, "bezeichnung": "Familienzimmer" } `    |
| PATCH  | `/api/v1/admin/zimmertyp` | `json { "keys": { "id": 9 }, "data": { "bezeichnung": "Familienzimmer XL" } } ` | `json { "id": 9, "bezeichnung": "Familienzimmer XL" } ` |
| DELETE | `/api/v1/admin/zimmertyp` | `json { "keys": { "id": 9 } } `                                                 | `json { "id": 9, "bezeichnung": "Familienzimmer XL" } ` |

---

# `zahlungsmethode`

| Method | API Call                        | Request JSON                                                                    | Response JSON                                           |
| ------ | ------------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------- |
| GET    | `/api/v1/admin/zahlungsmethode` | –                                                                               | `[{ "id": 1, "bezeichnung":"Kreditkarte" }]`            |
| POST   | `/api/v1/admin/zahlungsmethode` | `json { "bezeichnung": "Google Pay" } `                                         | `json { "id": 6, "bezeichnung": "Google Pay" } `        |
| PATCH  | `/api/v1/admin/zahlungsmethode` | `json { "keys": { "id": 6 }, "data": { "bezeichnung": "Google Pay (GPay)" } } ` | `json { "id": 6, "bezeichnung": "Google Pay (GPay)" } ` |
| DELETE | `/api/v1/admin/zahlungsmethode` | `json { "keys": { "id": 6 } } `                                                 | `json { "id": 6, "bezeichnung": "Google Pay (GPay)" } ` |

---

# `hotel_ausstattung` (Composite Key)

| Method | API Call                          | Request JSON                                                 | Response JSON                                   |
| ------ | --------------------------------- | ------------------------------------------------------------ | ----------------------------------------------- |
| GET    | `/api/v1/admin/hotel_ausstattung` | –                                                            | `[{ "hotel_id": 1, "ausstattung_id": 1 }, ...]` |
| POST   | `/api/v1/admin/hotel_ausstattung` | `json { "hotel_id": 1, "ausstattung_id": 3 } `               | `json { "hotel_id": 1, "ausstattung_id": 3 } `  |
| PATCH  | – (nicht sinnvoll)                | (würde 400 liefern, weil keine updatable Spalten außer Keys) | –                                               |
| DELETE | `/api/v1/admin/hotel_ausstattung` | `json { "keys": { "hotel_id": 1, "ausstattung_id": 3 } } `   | `json { "hotel_id": 1, "ausstattung_id": 3 } `  |

> Update bei m:n macht keinen Sinn → man löscht und fügt neu hinzu.

---

# `buchung_zimmer` (Composite Key)

| Method | API Call                       | Request JSON                                                                                | Response JSON                                                                               |
| ------ | ------------------------------ | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| GET    | `/api/v1/admin/buchung_zimmer` | –                                                                                           | `[{ "buchungs_id": 1, "zimmer_id": 2, "anzahl_gaeste": 2, "preis_pro_nacht": 129.99 }]`     |
| POST   | `/api/v1/admin/buchung_zimmer` | `json { "buchungs_id": 2, "zimmer_id": 6, "anzahl_gaeste": 2, "preis_pro_nacht": 229.00 } ` | `json { "buchungs_id": 2, "zimmer_id": 6, "anzahl_gaeste": 2, "preis_pro_nacht": 229.00 } ` |
| PATCH  | `/api/v1/admin/buchung_zimmer` | `json { "keys": { "buchungs_id": 2, "zimmer_id": 6 }, "data": { "anzahl_gaeste": 3 } } `    | `json { "buchungs_id": 2, "zimmer_id": 6, "anzahl_gaeste": 3, "preis_pro_nacht": 229.00 } ` |
| DELETE | `/api/v1/admin/buchung_zimmer` | `json { "keys": { "buchungs_id": 2, "zimmer_id": 6 } } `                                    | `json { "buchungs_id": 2, "zimmer_id": 6, "anzahl_gaeste": 3, "preis_pro_nacht": 229.00 } ` |

---

## Mini-Fehlerformate (falls ihr’s dokumentieren wollt)

**Table not allowed (400):**

```json
{ "statusCode": 400, "message": "Table not allowed" }
```

**Missing key (400):**

```json
{ "statusCode": 400, "message": "Missing key: hotel_id" }
```

**Row not found (404):**

```json
{ "statusCode": 404, "message": "Row not found" }
```

---
