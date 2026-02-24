import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString} from 'class-validator';

export class CreateHotelImageDto {
  @IsString()
  @IsNotEmpty()
  alt: string;

  @Type(() => Number)
  @IsNumber()
  sortOrder: number;

}