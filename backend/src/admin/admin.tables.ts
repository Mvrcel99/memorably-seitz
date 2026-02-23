export type TableConfig = {
  keys: string[];        // PK / composite key columns
  columns: string[];     // allowed columns for insert/update
};

export const ADMIN_TABLES: Record<string, TableConfig> = {
  // Rollen / Spezialisierung
  benutzer: {
    keys: ['benutzer_id'],
    columns: ['email', 'vorname', 'nachname', 'land', 'strasse', 'plz', 'ort'],
  },
  kunde: {
    keys: ['benutzer_id'],
    columns: ['benutzer_id'],
  },
  hotelbesitzer: {
    keys: ['benutzer_id'],
    columns: ['benutzer_id'],
  },

  // Stammdaten
  ausstattung: {
    keys: ['ausstattung_id'],
    columns: ['titel', 'beschreibung'],
  },
  zimmertyp: {
    keys: ['id'],
    columns: ['bezeichnung'],
  },
  zahlungsmethode: {
    keys: ['id'],
    columns: ['bezeichnung'],
  },

  // Join-Tabellen (Composite Keys)
  hotel_ausstattung: {
    keys: ['hotel_id', 'ausstattung_id'],
    columns: ['hotel_id', 'ausstattung_id'],
  },
  buchung_zimmer: {
    keys: ['buchungs_id', 'zimmer_id'],
    columns: ['buchungs_id', 'zimmer_id', 'anzahl_gaeste', 'preis_pro_nacht'],
  },
};