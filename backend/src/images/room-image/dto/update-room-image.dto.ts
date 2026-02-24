import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateRoomImageDto {
  @IsString()
  @IsOptional() 
  alt?: string;

  @Type(() => Number)
  @IsNumber()
  @IsOptional() 
  sortOrder?: number;
}