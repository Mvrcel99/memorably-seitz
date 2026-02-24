import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HotelbesitzerService } from './hotelbesitzer.service';
import { CreateHotelbesitzerDto } from './dto/create-hotelbesitzer.dto';
import { UpdateHotelbesitzerDto } from './dto/update-hotelbesitzer.dto';

@Controller('hotelbesitzer')
export class HotelbesitzerController {
  constructor(private readonly hotelbesitzerService: HotelbesitzerService) {}

  @Post()
  create(@Body() createHotelbesitzerDto: CreateHotelbesitzerDto) {
    return this.hotelbesitzerService.create(createHotelbesitzerDto);
  }

  @Get()
  findAll() {
    return this.hotelbesitzerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hotelbesitzerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHotelbesitzerDto: UpdateHotelbesitzerDto) {
    return this.hotelbesitzerService.update(+id, updateHotelbesitzerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hotelbesitzerService.remove(+id);
  }
}
