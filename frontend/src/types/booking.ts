// src/types/booking.ts

export interface BookingDto {
  id: number;
  buchungs_id?: number; // NEU: Deutsche ID aus dem Schema
  bookingCode: string;
  status: string;
  email: string;
  firstName: string;
  lastName: string;
  from: string; 
  to: string;   
  howMany: number; 
  anzahl_gaeste?: number; // NEU: Deutsche Bezeichnung
  totalPrice: number; 
  stornoDate: string | null;
  
  // WUNSCH 3: ZAHLUNGSMETHODE
  zahlungsmethode_id?: number; // NEU: Aus deinem Schema
  paymentMethodId?: number;    // NEU: Falls Jonas camelCase nutzt
  
  rooms: {
    id: number;
    zimmer_id?: number;        // NEU: Falls zimmer_id kommt
    name: string; 
    bezeichnung?: string;      // NEU: Deutscher Name
    pricePerNight: number; 
    basispreis?: number;       // NEU: Deutscher Preis
    
    hotel: {
      id: number;
      title: string; 
      name?: string;           // NEU: Falls 'name' statt 'title' kommt
      city: string;  
      ort?: string;            // NEU: Falls 'ort' statt 'city' kommt
      
      // WUNSCH 2: STORNOBEDINGUNGEN
      stornogebuehr_prozent?: number;           // NEU
      kostenlos_stornierbar_bis_stunden?: number; // NEU
    };
  }[];
}