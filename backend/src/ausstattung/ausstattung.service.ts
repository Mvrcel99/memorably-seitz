import { Injectable } from '@nestjs/common';
import { CreateAusstattungDto } from './dto/create-ausstattung.dto';
import { UpdateAusstattungDto } from './dto/update-ausstattung.dto';

@Injectable()
export class AusstattungService {
  create(createAusstattungDto: CreateAusstattungDto) {
    return 'This action adds a new ausstattung';
  }

  findAll() {
    return `This action returns all ausstattung`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ausstattung`;
  }

  update(id: number, updateAusstattungDto: UpdateAusstattungDto) {
    return `This action updates a #${id} ausstattung`;
  }

  remove(id: number) {
    return `This action removes a #${id} ausstattung`;
  }
}
