export class HotelListItemDto {
    hotelId: number; 
    title: string;
    city: string;
    stars: number;
    previewImageUrl: string;
    minPricePerNight: number;
    
    country?: string;
    slug?: string;
    featureIds?: number[];
}