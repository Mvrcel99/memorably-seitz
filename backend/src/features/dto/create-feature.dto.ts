import { IsString, MinLength } from 'class-validator';

export class CreateFeatureDto {
  @IsString()
  @MinLength(3)
  label: string;
}