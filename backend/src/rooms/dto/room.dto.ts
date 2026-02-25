import { ImageDto } from "src/images/image.dto";

export class RoomDto {
  zimmer_id: number; 
  zimmernr_hotel: string;
  bezeichnung: string;
  beschreibung: string;
  basispreis: number;
  max_anzahl: number;
  bilder: ImageDto[];
}