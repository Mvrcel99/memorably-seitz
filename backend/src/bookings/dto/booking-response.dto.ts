import { IsEmail, IsString, IsDateString, IsNumber, IsArray, IsEnum, ValidateNested, IsDate, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class HotelBookingDto {
  @IsString()
  id: string;

  @IsString()
  title: string;

  @IsString()
  city: string;
}

export class RoomBookingDto {
  @IsString()
  id: string;

  @ValidateNested()
  @Type(() => HotelBookingDto)
  hotel: HotelBookingDto;

  @IsString()
  name: string;

  @IsNumber()
  pricePerNight: number;
}

export enum BookingStatus {
  CONFIRMED = 'CONFIRMED',
  PENDING = 'PENDING',
  CANCELLED = 'CANCELLED'
}

export class ResponseBookingDto {
  @IsString()
  id: string;

  @IsString()
  bookingCode: string;

  @IsEnum(BookingStatus)
  status: BookingStatus;

  @IsEmail()
  email: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsDateString()
  from: string;

  @IsDateString()
  to: string;

  @IsNumber()
  howMany: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RoomBookingDto)
  rooms: RoomBookingDto[];

  @IsNumber()
  totalPrice: number;

  @IsDateString()
  createdAt: string;

  @IsOptional()
  @IsDateString()
  stornoDate?: string | null;
}