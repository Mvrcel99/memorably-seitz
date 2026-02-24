import { IsString, IsOptional, IsNumber, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { ResponseBookingDto, RoomBookingDto } from './booking-response.dto';

class OwnerRoomBookingDto extends RoomBookingDto {
  @IsOptional()
  declare hotel: any; 
}

export class OwnerResponseBookingDto extends ResponseBookingDto {
  
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OwnerRoomBookingDto)
  declare rooms: OwnerRoomBookingDto[];

  @IsNumber()
  @IsOptional()
  netAmount?: number;
}