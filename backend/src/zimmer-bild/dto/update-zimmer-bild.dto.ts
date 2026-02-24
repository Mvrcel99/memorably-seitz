import { PartialType } from '@nestjs/mapped-types';
import { CreateZimmerBildDto } from './create-zimmer-bild.dto';

export class UpdateZimmerBildDto extends PartialType(CreateZimmerBildDto) {}
