import { IsString, MinLength, IsOptional } from 'class-validator';

// KEIN Import von Controllern hier!

export class UpdateFeatureDto {
  @IsString()
  @MinLength(3)
  @IsOptional()
  titel?: string; // Entspricht deiner DB-Spalte 'titel'

  @IsString()
  @IsOptional()
  beschreibung?: string; // Entspricht deiner DB-Spalte 'beschreibung'
}