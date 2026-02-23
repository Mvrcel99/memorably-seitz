import { IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';

export class CreateHotelDto {
  @IsInt()
  besitzer_id: number;

  @IsString() @IsNotEmpty()
  name: string;

  @IsString() @IsNotEmpty()
  beschreibung: string;

  @IsInt() @Min(1) @Max(5)
  hotelsterne: number;

  @IsString() @IsNotEmpty()
  land: string;

  @IsString() @IsNotEmpty()
  strasse: string;

  @IsString() @IsNotEmpty()
  plz: string;

  @IsString() @IsNotEmpty()
  ort: string;

  @IsInt() @Min(0) @Max(100)
  stornogebuehr_prozent: number;

  @IsInt() @Min(0)
  kostenlos_stornierbar_bis_stunden: number;
}