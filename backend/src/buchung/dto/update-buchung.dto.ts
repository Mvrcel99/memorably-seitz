import { PartialType } from '@nestjs/mapped-types';
import { CreateBuchungDto } from './create-buchung.dto';

export class UpdateBuchungDto extends PartialType(CreateBuchungDto) {}
