# Prozessübersicht

---

## P1 – Benutzer registrieren

**Akteur:** Neuer Nutzer

**Vorbedingung:**
Keine bestehende Registrierung mit gleicher E-Mail.

**Ablauf:**

1. Nutzer gibt persönliche Daten ein.
2. System speichert Datensatz in `benutzer`.
3. Je nach Auswahl wird Datensatz in `kunde` oder `hotelbesitzer` angelegt.

**Nachbedingung:**
Benutzer existiert in der Datenbank und besitzt eine Rolle.

---

## P2 – Hotel anlegen / bearbeiten / löschen

**Akteur:** Hotelbesitzer

**Vorbedingung:**
Benutzer ist als `hotelbesitzer` registriert.

**Ablauf:**

1. Besitzer gibt Hoteldaten ein.
2. System speichert Daten in `hotel`.
3. Optional werden Bilder (`hotel_bild`) und Ausstattungen (`hotel_ausstattung`) hinzugefügt.
4. Änderungen oder Löschungen werden entsprechend aktualisiert.

**Nachbedingung:**
Hotel ist persistent gespeichert bzw. aktualisiert oder gelöscht.

---

## P3 – Zimmer verwalten

**Akteur:** Hotelbesitzer

**Vorbedingung:**
Hotel existiert.

**Ablauf:**

1. Besitzer legt Zimmer an (`zimmer`).
2. Zimmertyp wird ausgewählt (`zimmertyp`).
3. Optional werden Bilder (`zimmer_bild`) hinzugefügt.
4. Zimmer können geändert oder gelöscht werden.

**Nachbedingung:**
Zimmerbestand des Hotels ist aktuell in der Datenbank gespeichert.

---

## P4 – Hotel suchen und anzeigen

**Akteur:** Kunde

**Vorbedingung:**
Mindestens ein Hotel ist gespeichert.

**Ablauf:**

1. Kunde ruft Hotelübersicht auf.
2. System lädt Hotels (`hotel`) mit Bildern (`hotel_bild`).
3. Zimmer (`zimmer`) und Ausstattungen (`hotel_ausstattung`, `ausstattung`) werden angezeigt.

**Nachbedingung:**
Kunde erhält vollständige Übersicht aller verfügbaren Hotels.

---

## P5 – Buchung durchführen

**Akteur:** Kunde

**Vorbedingung:**
Kunde ist registriert und Zimmer existiert.

**Ablauf:**

1. Kunde wählt Zimmer und Zeitraum.
2. System legt Datensatz in `buchung` an.
3. Zugehörige Zimmer werden in `buchung_zimmer` gespeichert.
4. Zahlungsmethode (`zahlungsmethode`) wird hinterlegt.

**Nachbedingung:**
Buchung ist erfolgreich in der Datenbank gespeichert.

---

## P6 – Buchung stornieren

**Akteur:** Kunde

**Vorbedingung:**
Buchung existiert.

**Ablauf:**

1. Kunde wählt bestehende Buchung.
2. System setzt `stornodatum` oder löscht Buchung.

**Nachbedingung:**
Buchung ist als storniert markiert oder gelöscht.

---

## P7 – Bewertung abgeben / bearbeiten / löschen

**Akteur:** Kunde

**Vorbedingung:**
Abgeschlossene Buchung existiert.

**Ablauf:**

1. Kunde gibt Sterne, Titel und Text ein.
2. System speichert Eintrag in `bewertung`.
3. Bewertung kann geändert oder gelöscht werden.

**Nachbedingung:**
Bewertung ist persistent gespeichert.

---

## P8 – Stammdaten verwalten (Admin)

**Akteur:** Administrator

**Vorbedingung:**
Admin-Zugriff vorhanden.

**Ablauf:**

1. Admin verwaltet `ausstattung`, `zimmertyp`, `zahlungsmethode`.
2. Datensätze können angelegt, geändert oder gelöscht werden.

**Nachbedingung:**
Stammdaten sind aktuell und konsistent gespeichert.

---

