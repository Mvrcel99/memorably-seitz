import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class UpdateHotelDto {
  @IsOptional() @IsInt()
  besitzer_id?: number;

  @IsOptional() @IsString()
  name?: string;

  @IsOptional() @IsString()
  beschreibung?: string;

  @IsOptional() @IsInt() @Min(1) @Max(5)
  hotelsterne?: number;

  @IsOptional() @IsString()
  land?: string;

  @IsOptional() @IsString()
  strasse?: string;

  @IsOptional() @IsString()
  plz?: string;

  @IsOptional() @IsString()
  ort?: string;

  @IsOptional() @IsInt() @Min(0) @Max(100)
  stornogebuehr_prozent?: number;

  @IsOptional() @IsInt() @Min(0)
  kostenlos_stornierbar_bis_stunden?: number;
}