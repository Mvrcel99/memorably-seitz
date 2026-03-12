// src/types/booking.ts
export interface BookingDto {
  id: number;
  bookingCode: string;
  status: string;
  email: string;
  firstName: string;
  lastName: string;
  from: string; // Hier wieder 'from'
  to: string;   // Hier wieder 'to'
  howMany: number; // Hier wieder 'howMany'
  totalPrice: number; // Hier wieder 'totalPrice'
  stornoDate: string | null;
  rooms: {
    id: number;
    name: string; // Hier 'name'
    pricePerNight: number; // Hier 'pricePerNight'
    hotel: {
      id: number;
      title: string; // Hier 'title'
      city: string;  // Hier 'city'
    };
  }[];
}