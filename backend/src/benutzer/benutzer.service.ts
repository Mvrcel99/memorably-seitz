import { Injectable } from '@nestjs/common';
import { CreateBenutzerDto } from './dto/create-benutzer.dto';
import { UpdateBenutzerDto } from './dto/update-benutzer.dto';

@Injectable()
export class BenutzerService {
  create(createBenutzerDto: CreateBenutzerDto) {
    return 'This action adds a new benutzer';
  }

  findAll() {
    return `This action returns all benutzer`;
  }

  findOne(id: number) {
    return `This action returns a #${id} benutzer`;
  }

  update(id: number, updateBenutzerDto: UpdateBenutzerDto) {
    return `This action updates a #${id} benutzer`;
  }

  remove(id: number) {
    return `This action removes a #${id} benutzer`;
  }
}
