import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { HotelService } from './hotel.service';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { CreateHotelImageDto } from './dto/create-hotel-image.dto';
import { UpdateHotelImageDto } from './dto/update-hotel-image.dto';

@Controller('hotels')
export class HotelController {
  constructor(private readonly hotelsService: HotelService) {}

  // Hotels
  @Get()
  findAll() {
    return this.hotelsService.findAll();
  }

  @Get(':hotelId')
  findOne(@Param('hotelId') hotelId: string) {
    return this.hotelsService.findOne(Number(hotelId));
  }

  @Post()
  create(@Body() dto: CreateHotelDto) {
    return this.hotelsService.create(dto);
  }

  @Patch(':hotelId')
  update(@Param('hotelId') hotelId: string, @Body() dto: UpdateHotelDto) {
    return this.hotelsService.update(Number(hotelId), dto);
  }

  @Delete(':hotelId')
  remove(@Param('hotelId') hotelId: string) {
    return this.hotelsService.remove(Number(hotelId));
  }

  // Hotel Images
  @Get(':hotelId/images')
  listImages(@Param('hotelId') hotelId: string) {
    return this.hotelsService.listImages(Number(hotelId));
  }

  @Post(':hotelId/images')
  addImage(@Param('hotelId') hotelId: string, @Body() dto: CreateHotelImageDto) {
    return this.hotelsService.addImage(Number(hotelId), dto);
  }

  @Patch(':hotelId/images/:imageId')
  updateImage(
    @Param('hotelId') hotelId: string,
    @Param('imageId') imageId: string,
    @Body() dto: UpdateHotelImageDto,
  ) {
    return this.hotelsService.updateImage(Number(hotelId), Number(imageId), dto);
  }

  @Delete(':hotelId/images/:imageId')
  deleteImage(@Param('hotelId') hotelId: string, @Param('imageId') imageId: string) {
    return this.hotelsService.deleteImage(Number(hotelId), Number(imageId));
  }
}