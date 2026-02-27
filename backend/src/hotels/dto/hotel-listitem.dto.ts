export class HotelListItemDto {
    hotelId: number; // Als number für hotel_id
    title: string;
    city: string;
    stars: number;
    previewImageUrl: string;
    minPricePerNight: number;
    // Optionale Felder, falls du sie später brauchst:
    country?: string;
    slug?: string;
    featureIds?: number[];
}