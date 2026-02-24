import { Injectable } from '@nestjs/common';
import { CreateZahlungsmethodeDto } from './dto/create-zahlungsmethode.dto';
import { UpdateZahlungsmethodeDto } from './dto/update-zahlungsmethode.dto';

@Injectable()
export class ZahlungsmethodeService {
  create(createZahlungsmethodeDto: CreateZahlungsmethodeDto) {
    return 'This action adds a new zahlungsmethode';
  }

  findAll() {
    return `This action returns all zahlungsmethode`;
  }

  findOne(id: number) {
    return `This action returns a #${id} zahlungsmethode`;
  }

  update(id: number, updateZahlungsmethodeDto: UpdateZahlungsmethodeDto) {
    return `This action updates a #${id} zahlungsmethode`;
  }

  remove(id: number) {
    return `This action removes a #${id} zahlungsmethode`;
  }
}
