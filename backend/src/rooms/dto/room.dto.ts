import { ImageDto } from "src/images/image.dto";

export class RoomDto {
  id: string;
  name: string;
  description: string;
  pricePerNight: number;
  maxGuests: number;
  images: ImageDto[];
}