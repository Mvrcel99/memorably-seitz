export class BewertungResponseDto {
  buchungs_id: number;
  titel: string;
  text: string;
  sterne: number;
  // Angereicherte Infos aus der Buchung
  kunde: {
    vorname: string;
    nachname: string;
  };
  checkin: Date;
  checkout: Date;
}