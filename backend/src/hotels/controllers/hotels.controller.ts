import { Controller, Get, Param, Query } from '@nestjs/common';
import { HotelsService } from '../services/hotels.service';
import { HotelFilterDto } from '../dto/hotel-filter.dto';
import { HotelListItemDto } from '../dto/hotel-listitem.dto';
import { HotelResponseDto } from '../dto/hotel-response.dto';

@Controller({
  path: 'hotels',
  version: '1',
})
export class HotelsController {
  constructor(private readonly hotelService: HotelsService) {}

  @Get()
  async search(@Query() query: HotelFilterDto): Promise<HotelListItemDto[]> {
    return this.hotelService.searchHotels(query);
  }

  @Get(':identifier')
  async getDetails(@Param('identifier') identifier: string): Promise<HotelResponseDto> {
    const id = Number(identifier);

    if (!isNaN(id)) {
      const hotel = await this.hotelService.getHotelById(id);
      return this.hotelService.mapToResponseDto(hotel);
    }

    return this.hotelService.getHotelBySlug(identifier);
  }
}