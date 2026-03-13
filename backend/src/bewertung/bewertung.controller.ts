import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BewertungService } from './bewertung.service';
import { CreateBewertungDto } from './dto/create-bewertung.dto';
import { UpdateBewertungDto } from './dto/update-bewertung.dto';

@Controller({
  path: 'bewertungen',
  version: '1',
})
export class BewertungController {
  constructor(private readonly bewertungService: BewertungService) {}

  @Post()
  create(@Body() createBewertungDto: CreateBewertungDto) {
    return this.bewertungService.create(createBewertungDto);
  }

  @Get()
  findAll() {
    return this.bewertungService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bewertungService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBewertungDto: UpdateBewertungDto) {
    return this.bewertungService.update(+id, updateBewertungDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bewertungService.remove(+id);
  }
}
