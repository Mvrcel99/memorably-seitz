import { PartialType } from '@nestjs/mapped-types';
import { CreateHotelbesitzerDto } from './create-hotelbesitzer.dto';

export class UpdateHotelbesitzerDto extends PartialType(CreateHotelbesitzerDto) {}
