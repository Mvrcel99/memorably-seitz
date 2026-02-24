import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString} from 'class-validator';

export class CreateRoomImageDto {
  @IsString()
  @IsNotEmpty()
  alt: string;

  @Type(() => Number)
  @IsNumber()
  sortOrder: number;

}