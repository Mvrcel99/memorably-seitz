import { IsString, MinLength, IsOptional } from 'class-validator';



export class UpdateFeatureDto {
  @IsString()
  @MinLength(3)
  @IsOptional()
  titel?: string; 

  @IsString()
  @IsOptional()
  beschreibung?: string; 
}