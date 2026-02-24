import { PartialType } from '@nestjs/mapped-types';
import { CreateBewertungDto } from './create-bewertung.dto';

export class UpdateBewertungDto extends PartialType(CreateBewertungDto) {}
