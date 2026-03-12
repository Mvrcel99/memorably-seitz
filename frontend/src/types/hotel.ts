// src/types/hotel.ts

export interface ImageDto {
  id: number;
  url: string; // Backend schickt url, nicht pfad!
  alt: string; // Backend schickt alt, nicht alt_text!
  sortOrder: number;
}

export interface AusstattungDto {
  ausstattung_id: number;
  titel: string;
  beschreibung: string;
}

export interface RoomImageDto {
  id: number;
  url: string;
  alt: string;
  sortOrder: number;
}

export interface HotelRoomDto {
  id: string; 
  zimmer_id: number;
  zimmernr_hotel: string;
  bezeichnung: string;
  beschreibung: string;
  basispreis: number;
  zimmerTyp: string;
  max_gaeste: number;
  max_anzahl: number;
  ist_verfügbar: boolean;
  bilder: RoomImageDto[];
}

export interface HotelSearchDto {
  id: string;
  slug: string;
  title: string;
  stars: number;
  country: string;
  city: string;
  minPricePerNight: number;
  previewImageUrl: string;
  features?: string[];
}

export interface HotelDetailDto {
  hotelId: number;// Backend schickt id
  slug: string;
  title: string; // Backend schickt title, nicht name!
  description: string; // Backend schickt description!
  city: string; // Backend schickt city!
  country: string; // Backend schickt country!
  stars: number; // Backend schickt stars, nicht hotelsterne!
  
  // Diese fehlen im aktuellen JSON, sind aber evtl. im Backend noch vorhanden.
  // Mache sie optional (?), damit kein Fehler fliegt, falls sie fehlen.
  stornogebuehr_prozent?: number;
  kostenlos_stornierbar_bis_stunden?: number;
  latitude?: number;
  longitude?: number;
  
  features: AusstattungDto[]; // Backend nennt das Array "features", auch wenn der Inhalt deutsch ist!
  images: ImageDto[];
  rooms: HotelRoomDto[];
}