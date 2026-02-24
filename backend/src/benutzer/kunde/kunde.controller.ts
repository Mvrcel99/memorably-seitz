import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { KundeService } from './kunde.service';
import { CreateKundeDto } from './dto/create-kunde.dto';
import { UpdateKundeDto } from './dto/update-kunde.dto';

@Controller('kunde')
export class KundeController {
  constructor(private readonly kundeService: KundeService) {}

  @Post()
  create(@Body() createKundeDto: CreateKundeDto) {
    return this.kundeService.create(createKundeDto);
  }

  @Get()
  findAll() {
    return this.kundeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.kundeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateKundeDto: UpdateKundeDto) {
    return this.kundeService.update(+id, updateKundeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.kundeService.remove(+id);
  }
}
