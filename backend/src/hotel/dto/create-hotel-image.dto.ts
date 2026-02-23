import { IsNotEmpty, IsString } from 'class-validator';

export class CreateHotelImageDto {
  @IsString() @IsNotEmpty()
  pfad: string;

  @IsString() @IsNotEmpty()
  alt_text: string;
}