import { Injectable } from '@nestjs/common';
import { CreateBewertungDto } from './dto/create-bewertung.dto';
import { UpdateBewertungDto } from './dto/update-bewertung.dto';

@Injectable()
export class BewertungService {
  create(createBewertungDto: CreateBewertungDto) {
    return 'This action adds a new bewertung';
  }

  findAll() {
    return `This action returns all bewertung`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bewertung`;
  }

  update(id: number, updateBewertungDto: UpdateBewertungDto) {
    return `This action updates a #${id} bewertung`;
  }

  remove(id: number) {
    return `This action removes a #${id} bewertung`;
  }
}
