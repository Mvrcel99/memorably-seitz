import { Injectable } from '@nestjs/common';
import { CreateHotelBildDto } from './dto/create-hotel-bild.dto';
import { UpdateHotelBildDto } from './dto/update-hotel-bild.dto';

@Injectable()
export class HotelBildService {
  create(createHotelBildDto: CreateHotelBildDto) {
    return 'This action adds a new hotelBild';
  }

  findAll() {
    return `This action returns all hotelBild`;
  }

  findOne(id: number) {
    return `This action returns a #${id} hotelBild`;
  }

  update(id: number, updateHotelBildDto: UpdateHotelBildDto) {
    return `This action updates a #${id} hotelBild`;
  }

  remove(id: number) {
    return `This action removes a #${id} hotelBild`;
  }
}
