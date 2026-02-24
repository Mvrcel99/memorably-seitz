import { Injectable } from '@nestjs/common';
import { CreateKundeDto } from './dto/create-kunde.dto';
import { UpdateKundeDto } from './dto/update-kunde.dto';

@Injectable()
export class KundeService {
  create(createKundeDto: CreateKundeDto) {
    return 'This action adds a new kunde';
  }

  findAll() {
    return `This action returns all kunde`;
  }

  findOne(id: number) {
    return `This action returns a #${id} kunde`;
  }

  update(id: number, updateKundeDto: UpdateKundeDto) {
    return `This action updates a #${id} kunde`;
  }

  remove(id: number) {
    return `This action removes a #${id} kunde`;
  }
}
