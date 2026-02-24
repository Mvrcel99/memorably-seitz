import { PartialType } from '@nestjs/mapped-types';
import { CreateZahlungsmethodeDto } from './create-zahlungsmethode.dto';

export class UpdateZahlungsmethodeDto extends PartialType(CreateZahlungsmethodeDto) {}
