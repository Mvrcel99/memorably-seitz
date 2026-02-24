import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BuchungZimmerService } from './buchung-zimmer.service';
import { CreateBuchungZimmerDto } from './dto/create-buchung-zimmer.dto';
import { UpdateBuchungZimmerDto } from './dto/update-buchung-zimmer.dto';

@Controller('buchung-zimmer')
export class BuchungZimmerController {
  constructor(private readonly buchungZimmerService: BuchungZimmerService) {}

  @Post()
  create(@Body() createBuchungZimmerDto: CreateBuchungZimmerDto) {
    return this.buchungZimmerService.create(createBuchungZimmerDto);
  }

  @Get()
  findAll() {
    return this.buchungZimmerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.buchungZimmerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBuchungZimmerDto: UpdateBuchungZimmerDto) {
    return this.buchungZimmerService.update(+id, updateBuchungZimmerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.buchungZimmerService.remove(+id);
  }
}
