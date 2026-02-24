import { FeatureDto } from "src/features/dto/feature.dto";
import { ImageDto } from "src/images/image.dto";
import { RoomDto } from "src/rooms/dto/room.dto";

export class HotelResponseDto {
  id: string;
  title: string;
  slug: string;
  description: string;
  city: string;
  country: string;
  stars: number;
  features: FeatureDto[];
  images: ImageDto[];
  rooms: RoomDto[];
}