import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateHotelImageDto {
  @IsString()
  @IsOptional() 
  alt?: string;

  @IsOptional() 
  @Type(() => Number)
  @IsNumber()
  sortOrder?: number;
}