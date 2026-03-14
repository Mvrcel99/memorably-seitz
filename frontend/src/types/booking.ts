export interface BookingDto {
  id: number;
  buchungs_id?: number; 
  bookingCode: string;
  status: string;
  email: string;
  firstName: string;
  lastName: string;
  from: string; 
  to: string;   
  howMany: number; 
  anzahl_gaeste?: number; 
  totalPrice: number; 
  stornoDate: string | null;
  
  zahlungsmethode_id?: number; 
  paymentMethodId?: number;    
  
  paymentMethod?: { id: number | string; name: string };
  zahlungsmethode?: { id: number | string; name: string };
  
  rooms: {
    id: number;
    zimmer_id?: number;        
    name: string; 
    bezeichnung?: string;      
    pricePerNight: number; 
    basispreis?: number;       
    
    hotel: {
      id: number;
      title: string; 
      name?: string;           
      city: string;  
      ort?: string;            
      
      stornogebuehr_prozent?: number;           
      kostenlos_stornierbar_bis_stunden?: number; 

      stornogebuehrProzent?: number;
      kostenlosStornierbarBisStunden?: number;
    };
  }[];
}