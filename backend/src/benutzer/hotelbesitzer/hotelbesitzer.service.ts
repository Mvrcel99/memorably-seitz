import { Injectable } from '@nestjs/common';
import { CreateHotelbesitzerDto } from './dto/create-hotelbesitzer.dto';
import { UpdateHotelbesitzerDto } from './dto/update-hotelbesitzer.dto';

@Injectable()
export class HotelbesitzerService {
  create(createHotelbesitzerDto: CreateHotelbesitzerDto) {
    return 'This action adds a new hotelbesitzer';
  }

  findAll() {
    return `This action returns all hotelbesitzer`;
  }

  findOne(id: number) {
    return `This action returns a #${id} hotelbesitzer`;
  }

  update(id: number, updateHotelbesitzerDto: UpdateHotelbesitzerDto) {
    return `This action updates a #${id} hotelbesitzer`;
  }

  remove(id: number) {
    return `This action removes a #${id} hotelbesitzer`;
  }
}
