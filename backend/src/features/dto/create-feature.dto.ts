import { IsString, MinLength, IsOptional } from 'class-validator';

export class CreateFeatureDto {
  @IsString()
  @MinLength(3)
  titel: string; // Muss vorhanden sein für POST

  @IsString()
  @IsOptional()
  beschreibung?: string; // Optional, falls du es nicht mitschickst
}