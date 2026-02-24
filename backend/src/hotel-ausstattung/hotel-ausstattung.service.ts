import { Injectable } from '@nestjs/common';
import { CreateHotelAusstattungDto } from './dto/create-hotel-ausstattung.dto';
import { UpdateHotelAusstattungDto } from './dto/update-hotel-ausstattung.dto';

@Injectable()
export class HotelAusstattungService {
  create(createHotelAusstattungDto: CreateHotelAusstattungDto) {
    return 'This action adds a new hotelAusstattung';
  }

  findAll() {
    return `This action returns all hotelAusstattung`;
  }

  findOne(id: number) {
    return `This action returns a #${id} hotelAusstattung`;
  }

  update(id: number, updateHotelAusstattungDto: UpdateHotelAusstattungDto) {
    return `This action updates a #${id} hotelAusstattung`;
  }

  remove(id: number) {
    return `This action removes a #${id} hotelAusstattung`;
  }
}
