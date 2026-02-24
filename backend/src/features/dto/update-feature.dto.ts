import { IsString, MinLength } from 'class-validator';

export class UpdateFeatureDto {
  @IsString()
  @MinLength(3)
  label: string;
}