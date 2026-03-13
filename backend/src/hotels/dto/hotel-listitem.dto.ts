export class HotelListItemDto {
  hotelId: number;
  title: string;
  description: string; 
  city: string;
  stars: number;
  minPricePerNight: number;
  previewImageUrl: string;
  country: string;
  slug: string;
  featureIds: number[];
  latitude: number | null; 
  longitude: number | null;
  status: 'active' | 'inactiv';
}