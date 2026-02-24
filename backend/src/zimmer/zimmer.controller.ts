import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ZimmerService } from './zimmer.service';
import { CreateZimmerDto } from './dto/create-zimmer.dto';
import { UpdateZimmerDto } from './dto/update-zimmer.dto';

@Controller('zimmer')
export class ZimmerController {
  constructor(private readonly zimmerService: ZimmerService) {}

  @Post()
  create(@Body() createZimmerDto: CreateZimmerDto) {
    return this.zimmerService.create(createZimmerDto);
  }

  @Get()
  findAll() {
    return this.zimmerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.zimmerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateZimmerDto: UpdateZimmerDto) {
    return this.zimmerService.update(+id, updateZimmerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.zimmerService.remove(+id);
  }
}
