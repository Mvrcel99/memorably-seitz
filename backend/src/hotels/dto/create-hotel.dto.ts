import { IsString, IsNumber, Min, Max } from 'class-validator';

export class CreateHotelDto {
  @IsString()
  title: string;

  @IsNumber()
  ownerId: number;

  @IsString()
  description: string;

  @IsString()
  city: string;

  @IsString()
  country: string;

  @IsNumber() 
  @Min(1)
  @Max(5)
  stars: number;

  @IsNumber()
  longitude?: number;

  @IsNumber()
  latitude?: number;

  @IsNumber()
  @Min(0)
  free_Cancellation_Until_Hours_Before_CheckIn?: number; 
}