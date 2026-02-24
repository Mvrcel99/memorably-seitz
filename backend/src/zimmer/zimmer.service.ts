import { Injectable } from '@nestjs/common';
import { CreateZimmerDto } from './dto/create-zimmer.dto';
import { UpdateZimmerDto } from './dto/update-zimmer.dto';

@Injectable()
export class ZimmerService {
  create(createZimmerDto: CreateZimmerDto) {
    return 'This action adds a new zimmer';
  }

  findAll() {
    return `This action returns all zimmer`;
  }

  findOne(id: number) {
    return `This action returns a #${id} zimmer`;
  }

  update(id: number, updateZimmerDto: UpdateZimmerDto) {
    return `This action updates a #${id} zimmer`;
  }

  remove(id: number) {
    return `This action removes a #${id} zimmer`;
  }
}
