export interface HotelSearchDto {
  id: string;
  title: string;
  slug: string;
  city: string;
  country: string;
  stars: number;
  previewImageUrl: string; 
  minPricePerNight: number; 
  featureIds: number[];
  latitude: number;
  longitude: number;
}

export interface SearchParams {
  city?: string;
  from?: string;
  to?: string;
}

export interface HotelDetailDto {
  id: string;
  title: string;
  slug: string;
  description: string;
  city: string;
  country: string;
  stars: number;
  latitude: number;
  longitude: number;
  features: { id: number; label: string }[];
  images: { url: string; alt: string; sortOrder: number }[];
  rooms: HotelRoomDto[];
}

export interface HotelRoomDto {
  id: string;
  name: string;
  description: string;
  pricePerNight: number;
  maxGuests: number;
  roomNumber?: number;
  images: { url: string; alt: string; sortOrder: number }[];
}