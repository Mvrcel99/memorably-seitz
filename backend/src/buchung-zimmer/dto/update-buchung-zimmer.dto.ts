import { PartialType } from '@nestjs/mapped-types';
import { CreateBuchungZimmerDto } from './create-buchung-zimmer.dto';

export class UpdateBuchungZimmerDto extends PartialType(CreateBuchungZimmerDto) {}
