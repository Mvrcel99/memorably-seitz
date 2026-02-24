import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class BookingLookupDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  bookingCode: string;
}