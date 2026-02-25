import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateRoomDto {
  @IsString() 
  @IsNotEmpty()
  zimmernr_hotel: string;

  @IsString()
  @IsNotEmpty()
  bezeichnung: string;

  @IsString()
  beschreibung: string;

  @IsNumber()
  @Min(0)
  basispreis: number; 
  @IsNumber()
  @Min(1)
  max_anzahl: number; 
  
  @IsNumber()
  @IsNotEmpty()
  zimmertyp_id: number; 
}