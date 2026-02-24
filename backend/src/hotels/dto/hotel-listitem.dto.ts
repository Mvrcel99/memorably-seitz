// Output Hotel for HotelCards

export class HotelListItemDto{
    hotelId: string;
    title: string;
    slug: string;
    city: string;
    country: string;
    stars: number;
    longitude?: number | null;
    latitude?: number | null;
    previewImageUrl: string;
    minPricePerNight: number;
    featureIds: number[];
}