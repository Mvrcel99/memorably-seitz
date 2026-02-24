import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BenutzerService } from './benutzer.service';
import { CreateBenutzerDto } from './dto/create-benutzer.dto';
import { UpdateBenutzerDto } from './dto/update-benutzer.dto';

@Controller('benutzer')
export class BenutzerController {
  constructor(private readonly benutzerService: BenutzerService) {}

  @Post()
  create(@Body() createBenutzerDto: CreateBenutzerDto) {
    return this.benutzerService.create(createBenutzerDto);
  }

  @Get()
  findAll() {
    return this.benutzerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.benutzerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBenutzerDto: UpdateBenutzerDto) {
    return this.benutzerService.update(+id, updateBenutzerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.benutzerService.remove(+id);
  }
}
