import { IsString, IsNotEmpty } from 'class-validator';

export class CreateAusstattungDto {
  @IsString()
  @IsNotEmpty()
  titel: string;

  @IsString()
  @IsNotEmpty()
  beschreibung: string;
}