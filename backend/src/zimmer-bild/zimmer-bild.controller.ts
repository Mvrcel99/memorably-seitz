import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ZimmerBildService } from './zimmer-bild.service';
import { CreateZimmerBildDto } from './dto/create-zimmer-bild.dto';
import { UpdateZimmerBildDto } from './dto/update-zimmer-bild.dto';

@Controller('zimmer-bild')
export class ZimmerBildController {
  constructor(private readonly zimmerBildService: ZimmerBildService) {}

  @Post()
  create(@Body() createZimmerBildDto: CreateZimmerBildDto) {
    return this.zimmerBildService.create(createZimmerBildDto);
  }

  @Get()
  findAll() {
    return this.zimmerBildService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.zimmerBildService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateZimmerBildDto: UpdateZimmerBildDto) {
    return this.zimmerBildService.update(+id, updateZimmerBildDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.zimmerBildService.remove(+id);
  }
}
