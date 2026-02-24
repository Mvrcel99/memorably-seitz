import { Controller, Get, Param, Query } from '@nestjs/common';
import { HotelsService } from '../services/hotels.service';
import { HotelFilterDto } from '../dto/hotel-filter.dto';
import { HotelListItemDto } from '../dto/hotel-listitem.dto';

@Controller({
  path: 'hotels',
  version: '1',
})
export class HotelsController {
    constructor(private readonly hotelService: HotelsService) {}

    // 1. GET  /hotels?city=&from=&to=
  // @Get()
  // async search(
  //     @Query() query : HotelFilterDto): Promise<HotelListItemDto[]> {
  //       const { city, from, to } = query;
  //       return this.hotelService.searchHotels(city,from,to)
  //     }
  
  //     // 2. GET /api/v1/hotels/:slug
  // @Get(':slug')
  // getBySlug(@Param('slug') slug: string) {
    
  //   return this.hotelService.getHotelDetailBySlug(slug)
  // }

}
