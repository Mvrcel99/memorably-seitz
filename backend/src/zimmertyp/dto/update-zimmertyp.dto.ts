import { PartialType } from '@nestjs/mapped-types';
import { CreateZimmertypDto } from './create-zimmertyp.dto';

export class UpdateZimmertypDto extends PartialType(CreateZimmertypDto) {}
