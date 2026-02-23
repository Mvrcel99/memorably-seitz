-- =========================================
-- REALISTIC SEED DATA
-- =========================================

-- -------------------------
-- Benutzer (4 Kunden, 2 Besitzer)
-- -------------------------
INSERT INTO benutzer (email, vorname, nachname, land, strasse, plz, ort)
VALUES
('kunde1@test.de', 'Max', 'Mustermann', 'DE', 'Hauptstr. 1', '89518', 'Heidenheim'),
('kunde2@test.de', 'Lena', 'Schmidt', 'DE', 'Bahnhofstr. 12', '70173', 'Stuttgart'),
('kunde3@test.de', 'Paul', 'Weber', 'DE', 'Gartenweg 3', '80331', 'München'),
('kunde4@test.de', 'Sofia', 'Keller', 'DE', 'Bergstr. 9', '20095', 'Hamburg'),
('besitzer1@test.de', 'Anna', 'Hotelier', 'DE', 'Marktplatz 5', '89518', 'Heidenheim'),
('besitzer2@test.de', 'Tom', 'Gastgeber', 'DE', 'Seestr. 21', '87629', 'Füssen');

-- -------------------------
-- Rollen
-- -------------------------
INSERT INTO kunde (benutzer_id) VALUES (1), (2), (3), (4);
INSERT INTO hotelbesitzer (benutzer_id) VALUES (5), (6);

-- -------------------------
-- Zahlungsmethoden (Stammdaten)
-- -------------------------
INSERT INTO zahlungsmethode (bezeichnung)
VALUES ('Kreditkarte'), ('PayPal'), ('Überweisung'), ('Apple Pay');

-- -------------------------
-- Zimmertypen (Stammdaten)
-- -------------------------
INSERT INTO zimmertyp (bezeichnung)
VALUES ('Einzelzimmer'), ('Doppelzimmer'), ('Suite');

-- -------------------------
-- Ausstattung (Stammdaten)
-- -------------------------
INSERT INTO ausstattung (titel, beschreibung)
VALUES
('WLAN', 'Kostenloses Highspeed-Internet'),
('Frühstück', 'Frühstücksbuffet inklusive'),
('Parkplatz', 'Kostenloser Parkplatz'),
('Fitness', 'Fitnessraum im Haus'),
('Spa', 'Sauna und Wellnessbereich');

-- -------------------------
-- Hotels (2 Stück)
-- -------------------------
INSERT INTO hotel (
  besitzer_id, name, beschreibung, hotelsterne, land, strasse, plz, ort,
  stornogebuehr_prozent, kostenlos_stornierbar_bis_stunden
)
VALUES
(5, 'Hotel Alpha', 'Modernes Businesshotel mit zentraler Lage', 4, 'DE', 'Hotelweg 10', '89518', 'Heidenheim', 20, 24),
(6, 'Bergblick Lodge', 'Gemütliches Hotel nahe der Berge', 3, 'DE', 'Alpenstr. 7', '87629', 'Füssen', 30, 48);

-- -------------------------
-- Hotel Bilder
-- -------------------------
INSERT INTO hotel_bild (hotel_id, pfad, alt_text)
VALUES
(1, '/images/hotel_alpha_aussen.jpg', 'Außenansicht Hotel Alpha'),
(1, '/images/hotel_alpha_lobby.jpg', 'Lobby Hotel Alpha'),
(2, '/images/bergblick_aussen.jpg', 'Außenansicht Bergblick Lodge'),
(2, '/images/bergblick_spa.jpg', 'Wellnessbereich Bergblick Lodge');

-- -------------------------
-- Hotel Ausstattung (m:n)
-- -------------------------
-- Hotel Alpha: WLAN, Frühstück, Parkplatz, Fitness
INSERT INTO hotel_ausstattung (hotel_id, ausstattung_id)
VALUES (1,1), (1,2), (1,3), (1,4);

-- Bergblick Lodge: WLAN, Frühstück, Spa, Parkplatz
INSERT INTO hotel_ausstattung (hotel_id, ausstattung_id)
VALUES (2,1), (2,2), (2,5), (2,3);

-- -------------------------
-- Zimmer (6 Stück)
-- -------------------------
-- Hotel Alpha (hotel_id=1)
INSERT INTO zimmer (hotel_id, zimmernr_hotel, bezeichnung, beschreibung, basispreis, max_anzahl, zimmertyp_id)
VALUES
(1, '101', 'Einzelzimmer Standard', 'Kompakt, ruhig, perfekt für 1 Person', 79.99, 1, 1),
(1, '201', 'Doppelzimmer Komfort', 'Mehr Platz, Schreibtisch, helles Bad', 129.99, 2, 2),
(1, '301', 'Suite Business', 'Suite mit Sofa-Ecke und großem Bad', 189.99, 3, 3);

-- Bergblick Lodge (hotel_id=2)
INSERT INTO zimmer (hotel_id, zimmernr_hotel, bezeichnung, beschreibung, basispreis, max_anzahl, zimmertyp_id)
VALUES
(2, '10', 'Einzelzimmer Berg', 'Bergblick, gemütlich, Holzelemente', 89.00, 1, 1),
(2, '20', 'Doppelzimmer Panorama', 'Panoramafenster, Balkon, Bergblick', 149.00, 2, 2),
(2, '30', 'Suite Alpen', 'Suite mit Balkon, ideal für Paare/Familien', 229.00, 4, 3);

-- -------------------------
-- Zimmer Bilder
-- -------------------------
INSERT INTO zimmer_bild (zimmer_id, pfad, alt_text)
VALUES
(1, '/images/alpha_101.jpg', 'Hotel Alpha Zimmer 101'),
(2, '/images/alpha_201.jpg', 'Hotel Alpha Zimmer 201'),
(3, '/images/alpha_301.jpg', 'Hotel Alpha Suite 301'),
(4, '/images/bergblick_10.jpg', 'Bergblick Lodge Zimmer 10'),
(5, '/images/bergblick_20.jpg', 'Bergblick Lodge Zimmer 20'),
(6, '/images/bergblick_30.jpg', 'Bergblick Lodge Suite 30');

-- =========================================
-- Buchungen (mehrere, realistische Streuung)
-- =========================================

-- B1: vergangene Buchung (Kunde 1), Hotel Alpha, Doppelzimmer (zimmer_id=2), bezahlt per Kreditkarte
INSERT INTO buchung (
  kunde_id, buchungsdatum, checkin, checkout, stornodatum,
  anzahl_gaeste, preis_pro_nacht, zahlungsmethode_id, zahlungsdatum
)
VALUES (
  1,
  CURRENT_DATE - INTERVAL '30 days',
  CURRENT_DATE - INTERVAL '20 days',
  CURRENT_DATE - INTERVAL '18 days',
  NULL,
  2,
  129.99,
  1,
  CURRENT_DATE - INTERVAL '30 days'
);

INSERT INTO buchung_zimmer (buchungs_id, zimmer_id, anzahl_gaeste, preis_pro_nacht)
VALUES (1, 2, 2, 129.99);

-- Bewertung zu B1
INSERT INTO bewertung (buchungs_id, titel, text, sterne)
VALUES (1, 'Sehr gutes Hotel', 'Sauber, freundlich, gutes Frühstück.', 5);

-- B2: zukünftige Buchung (Kunde 2), Bergblick Lodge, Suite (zimmer_id=6), PayPal
INSERT INTO buchung (
  kunde_id, buchungsdatum, checkin, checkout, stornodatum,
  anzahl_gaeste, preis_pro_nacht, zahlungsmethode_id, zahlungsdatum
)
VALUES (
  2,
  CURRENT_DATE - INTERVAL '3 days',
  CURRENT_DATE + INTERVAL '10 days',
  CURRENT_DATE + INTERVAL '13 days',
  NULL,
  2,
  229.00,
  2,
  CURRENT_DATE - INTERVAL '3 days'
);

INSERT INTO buchung_zimmer (buchungs_id, zimmer_id, anzahl_gaeste, preis_pro_nacht)
VALUES (2, 6, 2, 229.00);

-- B3: Multi-Zimmer-Buchung (Kunde 3), Hotel Alpha: Einzelzimmer + Doppelzimmer (zimmer_id=1 & 2), Überweisung
INSERT INTO buchung (
  kunde_id, buchungsdatum, checkin, checkout, stornodatum,
  anzahl_gaeste, preis_pro_nacht, zahlungsmethode_id, zahlungsdatum
)
VALUES (
  3,
  CURRENT_DATE - INTERVAL '10 days',
  CURRENT_DATE + INTERVAL '2 days',
  CURRENT_DATE + INTERVAL '5 days',
  NULL,
  3,
  0.00,         -- Preis pro Nacht ist bei euch auch in buchung_zimmer; hier neutral gehalten
  3,
  CURRENT_DATE - INTERVAL '9 days'
);

INSERT INTO buchung_zimmer (buchungs_id, zimmer_id, anzahl_gaeste, preis_pro_nacht)
VALUES
(3, 1, 1, 79.99),
(3, 2, 2, 129.99);

-- B4: stornierte Buchung (Kunde 4), Bergblick Lodge, Doppelzimmer (zimmer_id=5), Apple Pay
INSERT INTO buchung (
  kunde_id, buchungsdatum, checkin, checkout, stornodatum,
  anzahl_gaeste, preis_pro_nacht, zahlungsmethode_id, zahlungsdatum
)
VALUES (
  4,
  CURRENT_DATE - INTERVAL '15 days',
  CURRENT_DATE + INTERVAL '20 days',
  CURRENT_DATE + INTERVAL '23 days',
  CURRENT_DATE - INTERVAL '5 days', -- stornodatum >= buchungsdatum erfüllt
  2,
  149.00,
  4,
  CURRENT_DATE - INTERVAL '15 days'
);

INSERT INTO buchung_zimmer (buchungs_id, zimmer_id, anzahl_gaeste, preis_pro_nacht)
VALUES (4, 5, 2, 149.00);

-- B5: vergangene Buchung (Kunde 2), Bergblick Lodge, Doppelzimmer (zimmer_id=5), Kreditkarte
INSERT INTO buchung (
  kunde_id, buchungsdatum, checkin, checkout, stornodatum,
  anzahl_gaeste, preis_pro_nacht, zahlungsmethode_id, zahlungsdatum
)
VALUES (
  2,
  CURRENT_DATE - INTERVAL '60 days',
  CURRENT_DATE - INTERVAL '50 days',
  CURRENT_DATE - INTERVAL '47 days',
  NULL,
  2,
  149.00,
  1,
  CURRENT_DATE - INTERVAL '60 days'
);

INSERT INTO buchung_zimmer (buchungs_id, zimmer_id, anzahl_gaeste, preis_pro_nacht)
VALUES (5, 5, 2, 149.00);

-- Bewertung zu B5
INSERT INTO bewertung (buchungs_id, titel, text, sterne)
VALUES (5, 'Schöne Lage', 'Toller Bergblick, Zimmer etwas hellhörig.', 4);