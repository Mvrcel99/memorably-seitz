import { PartialType } from '@nestjs/mapped-types';
import { CreateHotelAusstattungDto } from './create-hotel-ausstattung.dto';

export class UpdateHotelAusstattungDto extends PartialType(CreateHotelAusstattungDto) {}
