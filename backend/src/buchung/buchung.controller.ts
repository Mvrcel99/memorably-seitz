import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BuchungService } from './buchung.service';
import { CreateBuchungDto } from './dto/create-buchung.dto';
import { UpdateBuchungDto } from './dto/update-buchung.dto';

@Controller('buchung')
export class BuchungController {
  constructor(private readonly buchungService: BuchungService) {}

  @Post()
  create(@Body() createBuchungDto: CreateBuchungDto) {
    return this.buchungService.create(createBuchungDto);
  }

  @Get()
  findAll() {
    return this.buchungService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.buchungService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBuchungDto: UpdateBuchungDto) {
    return this.buchungService.update(+id, updateBuchungDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.buchungService.remove(+id);
  }
}
