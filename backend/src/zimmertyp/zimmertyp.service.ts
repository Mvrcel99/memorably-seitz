import { Injectable } from '@nestjs/common';
import { CreateZimmertypDto } from './dto/create-zimmertyp.dto';
import { UpdateZimmertypDto } from './dto/update-zimmertyp.dto';

@Injectable()
export class ZimmertypService {
  create(createZimmertypDto: CreateZimmertypDto) {
    return 'This action adds a new zimmertyp';
  }

  findAll() {
    return `This action returns all zimmertyp`;
  }

  findOne(id: number) {
    return `This action returns a #${id} zimmertyp`;
  }

  update(id: number, updateZimmertypDto: UpdateZimmertypDto) {
    return `This action updates a #${id} zimmertyp`;
  }

  remove(id: number) {
    return `This action removes a #${id} zimmertyp`;
  }
}
