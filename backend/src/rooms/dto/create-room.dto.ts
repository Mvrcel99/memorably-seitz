import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateRoomDto {
  @IsNumber()
  @IsNotEmpty()
  roomNumber: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  @Min(1)
  pricePerNight: number; // In Cent angegeben

  @IsNumber()
  @Min(1)
  maxGuests: number;
}