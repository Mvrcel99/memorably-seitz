import { IsInt, IsString, Min, Max, MinLength, MaxLength, IsEmail } from 'class-validator';
 
export class CreateBewertungDto {

    @IsEmail()
  email: string;

  @IsInt()
  buchungs_id: number;
 
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  titel: string;
 
  @IsString()
  @MinLength(10)
  @MaxLength(2000)
  text: string;
 
  @IsInt()
  @Min(1)
  @Max(5)
  sterne: number;
}
 