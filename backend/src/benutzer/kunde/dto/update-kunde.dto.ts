import { PartialType } from '@nestjs/mapped-types';
import { CreateKundeDto } from './create-kunde.dto';

export class UpdateKundeDto extends PartialType(CreateKundeDto) {}
