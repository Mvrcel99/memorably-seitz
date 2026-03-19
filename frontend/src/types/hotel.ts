export interface ImageDto {
  id: number;
  url: string; 
  alt: string; 
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

export interface BewertungDto {
  buchungs_id?: number;
  titel?: string;
  text?: string;
  sterne: number;
  gast_name?: string;
  kommentar?: string;
  kunde?: {
    vorname: string;
    nachname: string;
  };
  checkin?: string;
  checkout?: string;
}

export interface HotelDetailDto {
  hotelId: number;
  slug: string;
  
  title: string; 
  description: string; 
  city: string; 
  country: string; 
  stars: number; 
  
  name?: string;
  beschreibung?: string;
  ort?: string;
  land?: string;
  strasse?: string;
  plz?: string;
  bewertungen?: BewertungDto[];
  
 
  stornogebuehr_prozent?: number;
  kostenlos_stornierbar_bis_stunden?: number;
  
 
  stornogebuehrProzent?: number;
  kostenlosStornierbarBisStunden?: number;
  
  latitude?: number;
  longitude?: number;
  
  features: AusstattungDto[]; 
  images: ImageDto[];
  rooms: HotelRoomDto[];
}