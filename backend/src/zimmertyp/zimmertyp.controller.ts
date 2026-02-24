import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ZimmertypService } from './zimmertyp.service';
import { CreateZimmertypDto } from './dto/create-zimmertyp.dto';
import { UpdateZimmertypDto } from './dto/update-zimmertyp.dto';

@Controller('zimmertyp')
export class ZimmertypController {
  constructor(private readonly zimmertypService: ZimmertypService) {}

  @Post()
  create(@Body() createZimmertypDto: CreateZimmertypDto) {
    return this.zimmertypService.create(createZimmertypDto);
  }

  @Get()
  findAll() {
    return this.zimmertypService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.zimmertypService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateZimmertypDto: UpdateZimmertypDto) {
    return this.zimmertypService.update(+id, updateZimmertypDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.zimmertypService.remove(+id);
  }
}
