import { PartialType } from '@nestjs/mapped-types';
import { CreateZimmerDto } from './create-zimmer.dto';

export class UpdateZimmerDto extends PartialType(CreateZimmerDto) {}
