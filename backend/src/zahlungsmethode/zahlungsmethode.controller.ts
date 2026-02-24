import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ZahlungsmethodeService } from './zahlungsmethode.service';
import { CreateZahlungsmethodeDto } from './dto/create-zahlungsmethode.dto';
import { UpdateZahlungsmethodeDto } from './dto/update-zahlungsmethode.dto';

@Controller('zahlungsmethode')
export class ZahlungsmethodeController {
  constructor(private readonly zahlungsmethodeService: ZahlungsmethodeService) {}

  @Post()
  create(@Body() createZahlungsmethodeDto: CreateZahlungsmethodeDto) {
    return this.zahlungsmethodeService.create(createZahlungsmethodeDto);
  }

  @Get()
  findAll() {
    return this.zahlungsmethodeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.zahlungsmethodeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateZahlungsmethodeDto: UpdateZahlungsmethodeDto) {
    return this.zahlungsmethodeService.update(+id, updateZahlungsmethodeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.zahlungsmethodeService.remove(+id);
  }
}
