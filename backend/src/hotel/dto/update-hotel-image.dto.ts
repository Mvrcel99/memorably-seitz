import { IsOptional, IsString } from 'class-validator';

export class UpdateHotelImageDto {
  @IsOptional() @IsString()
  pfad?: string;

  @IsOptional() @IsString()
  alt_text?: string;
}