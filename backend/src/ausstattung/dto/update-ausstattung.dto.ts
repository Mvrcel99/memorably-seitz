import { PartialType } from '@nestjs/mapped-types';
import { CreateAusstattungDto } from './create-ausstattung.dto';

export class UpdateAusstattungDto extends PartialType(CreateAusstattungDto) {}
