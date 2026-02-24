import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AusstattungService } from './ausstattung.service';
import { CreateAusstattungDto } from './dto/create-ausstattung.dto';
import { UpdateAusstattungDto } from './dto/update-ausstattung.dto';

@Controller('ausstattung')
export class AusstattungController {
  constructor(private readonly ausstattungService: AusstattungService) {}

  @Post()
  create(@Body() createAusstattungDto: CreateAusstattungDto) {
    return this.ausstattungService.create(createAusstattungDto);
  }

  @Get()
  findAll() {
    return this.ausstattungService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ausstattungService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAusstattungDto: UpdateAusstattungDto) {
    return this.ausstattungService.update(+id, updateAusstattungDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ausstattungService.remove(+id);
  }
}
