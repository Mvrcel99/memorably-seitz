import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HotelAusstattungService } from './hotel-ausstattung.service';
import { CreateHotelAusstattungDto } from './dto/create-hotel-ausstattung.dto';
import { UpdateHotelAusstattungDto } from './dto/update-hotel-ausstattung.dto';

@Controller('hotel-ausstattung')
export class HotelAusstattungController {
  constructor(private readonly hotelAusstattungService: HotelAusstattungService) {}

  @Post()
  create(@Body() createHotelAusstattungDto: CreateHotelAusstattungDto) {
    return this.hotelAusstattungService.create(createHotelAusstattungDto);
  }

  @Get()
  findAll() {
    return this.hotelAusstattungService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hotelAusstattungService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHotelAusstattungDto: UpdateHotelAusstattungDto) {
    return this.hotelAusstattungService.update(+id, updateHotelAusstattungDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hotelAusstattungService.remove(+id);
  }
}
