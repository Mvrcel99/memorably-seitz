import { PartialType } from '@nestjs/mapped-types';
import { CreateHotelBildDto } from './create-hotel-bild.dto';

export class UpdateHotelBildDto extends PartialType(CreateHotelBildDto) {}
