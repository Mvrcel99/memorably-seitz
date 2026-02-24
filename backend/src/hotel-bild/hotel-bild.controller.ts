import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HotelBildService } from './hotel-bild.service';
import { CreateHotelBildDto } from './dto/create-hotel-bild.dto';
import { UpdateHotelBildDto } from './dto/update-hotel-bild.dto';

@Controller('hotel-bild')
export class HotelBildController {
  constructor(private readonly hotelBildService: HotelBildService) {}

  @Post()
  create(@Body() createHotelBildDto: CreateHotelBildDto) {
    return this.hotelBildService.create(createHotelBildDto);
  }

  @Get()
  findAll() {
    return this.hotelBildService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hotelBildService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHotelBildDto: UpdateHotelBildDto) {
    return this.hotelBildService.update(+id, updateHotelBildDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hotelBildService.remove(+id);
  }
}
