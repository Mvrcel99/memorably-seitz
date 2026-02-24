import { Injectable } from '@nestjs/common';
import { CreateBuchungZimmerDto } from './dto/create-buchung-zimmer.dto';
import { UpdateBuchungZimmerDto } from './dto/update-buchung-zimmer.dto';

@Injectable()
export class BuchungZimmerService {
  create(createBuchungZimmerDto: CreateBuchungZimmerDto) {
    return 'This action adds a new buchungZimmer';
  }

  findAll() {
    return `This action returns all buchungZimmer`;
  }

  findOne(id: number) {
    return `This action returns a #${id} buchungZimmer`;
  }

  update(id: number, updateBuchungZimmerDto: UpdateBuchungZimmerDto) {
    return `This action updates a #${id} buchungZimmer`;
  }

  remove(id: number) {
    return `This action removes a #${id} buchungZimmer`;
  }
}
