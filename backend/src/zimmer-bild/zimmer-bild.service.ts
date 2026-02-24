import { Injectable } from '@nestjs/common';
import { CreateZimmerBildDto } from './dto/create-zimmer-bild.dto';
import { UpdateZimmerBildDto } from './dto/update-zimmer-bild.dto';

@Injectable()
export class ZimmerBildService {
  create(createZimmerBildDto: CreateZimmerBildDto) {
    return 'This action adds a new zimmerBild';
  }

  findAll() {
    return `This action returns all zimmerBild`;
  }

  findOne(id: number) {
    return `This action returns a #${id} zimmerBild`;
  }

  update(id: number, updateZimmerBildDto: UpdateZimmerBildDto) {
    return `This action updates a #${id} zimmerBild`;
  }

  remove(id: number) {
    return `This action removes a #${id} zimmerBild`;
  }
}
