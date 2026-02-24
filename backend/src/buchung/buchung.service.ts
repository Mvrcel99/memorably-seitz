import { Injectable } from '@nestjs/common';
import { CreateBuchungDto } from './dto/create-buchung.dto';
import { UpdateBuchungDto } from './dto/update-buchung.dto';

@Injectable()
export class BuchungService {
  create(createBuchungDto: CreateBuchungDto) {
    return 'This action adds a new buchung';
  }

  findAll() {
    return `This action returns all buchung`;
  }

  findOne(id: number) {
    return `This action returns a #${id} buchung`;
  }

  update(id: number, updateBuchungDto: UpdateBuchungDto) {
    return `This action updates a #${id} buchung`;
  }

  remove(id: number) {
    return `This action removes a #${id} buchung`;
  }
}
