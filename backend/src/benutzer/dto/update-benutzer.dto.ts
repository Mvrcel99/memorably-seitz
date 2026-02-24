import { PartialType } from '@nestjs/mapped-types';
import { CreateBenutzerDto } from './create-benutzer.dto';

export class UpdateBenutzerDto extends PartialType(CreateBenutzerDto) {}
