import { IsString, MinLength, IsOptional } from 'class-validator';

export class CreateFeatureDto {
  @IsString()
  @MinLength(3)
  titel: string; 

  @IsString()
  @IsOptional()
  beschreibung?: string; 
}