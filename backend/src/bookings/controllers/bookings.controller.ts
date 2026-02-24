import { Body, Controller, Get, Patch, Post, Query } from '@nestjs/common';
import { BookingsService } from '../services/bookings.service';
import { ResponseBookingDto } from '../dto/booking-response.dto';
import { CreateBookingDto } from '../dto/create-booking.dto';
import { BookingLookupDto } from '../dto/booking-lookup.dto';
import { BookingAvailabilityService } from '../services/booking-availability.service';

@Controller({
  path: 'bookings',
  version: '1',
})
export class BookingsController {
    constructor(
        private readonly bookingsService: BookingsService, 
        private readonly bookingAvailabilityService: BookingAvailabilityService
    ) {}

    // // Buchung anlegen: POST /api/v1/bookings
    // @Post()
    // createBooking(@Body() createBookingDto: CreateBookingDto): Promise<ResponseBookingDto> {
    //     return //this.bookingsService.createBooking(createBookingDto);
    // }

    // // Buchungen eines Users: GET /api/v1/bookings/lookup?email=&code=
    // @Get('lookup')
    // getBooking(@Query () query: BookingLookupDto): Promise<ResponseBookingDto>{
    //     return //this.bookingsService.getBookingFromUser(query);
    // }

    // @Patch('cancel')
    // cancelBooking(@Query () query: BookingLookupDto): Promise<ResponseBookingDto>{
    //     return //this.bookingsService.cancelBookingFromUser(query);
    // }
}
