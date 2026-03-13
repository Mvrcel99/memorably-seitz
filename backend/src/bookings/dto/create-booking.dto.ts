import { IsEmail, IsString, IsDateString, IsNumber, IsArray, Min, ArrayMinSize } from 'class-validator';

export class CreateBookingDto {
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
  @Min(1)
  howMany: number;

  @IsArray()
  @IsNumber({}, { each: true }) // Geändert: Zimmer-IDs sind jetzt Zahlen
  @ArrayMinSize(1)
  roomIds: number[];

    @IsNumber()
  zahlungsmethode_id: number;
}