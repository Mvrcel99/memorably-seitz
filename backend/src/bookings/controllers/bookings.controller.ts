import { Body, Controller, Get, Patch, Post, Query } from '@nestjs/common';
import { BookingsService } from '../services/bookings.service';
import { ResponseBookingDto } from '../dto/booking-response.dto';
import { CreateBookingDto } from '../dto/create-booking.dto';
import { BookingLookupDto } from '../dto/booking-lookup.dto';

@Controller({
  path: 'bookings',
  version: '1',
})
export class BookingsController {
  constructor(
    private readonly bookingsService: BookingsService
  
   
  ) {}


  @Post()
  async createBooking(@Body() createBookingDto: CreateBookingDto): Promise<ResponseBookingDto> {
    return this.bookingsService.createBooking(createBookingDto);
  }

 
  @Get('lookup')
  async getBooking(@Query() query: BookingLookupDto): Promise<ResponseBookingDto> {
    return this.bookingsService.getBookingFromUser(query);
  }


  @Patch('cancel')
  async cancelBooking(@Query() query: BookingLookupDto): Promise<ResponseBookingDto> {
    return this.bookingsService.cancelBooking(query);
  }
}