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
    // Hinweis: Den BookingAvailabilityService brauchen wir hier im Controller meist nicht direkt, 
    // da der BookingsService die Logik intern regelt.
  ) {}

  // 1. Eine neue Buchung erstellen
  @Post()
  async createBooking(@Body() createBookingDto: CreateBookingDto): Promise<ResponseBookingDto> {
    return this.bookingsService.createBooking(createBookingDto);
  }

  // 2. Eine Buchung finden (z.B. über E-Mail und Buchungsnummer)
  @Get('lookup')
  async getBooking(@Query() query: BookingLookupDto): Promise<ResponseBookingDto> {
    return this.bookingsService.getBookingFromUser(query);
  }

  // 3. Eine Buchung stornieren
  // WICHTIG: Hier sollte die Methode 'cancelBooking' im Service aufgerufen werden, nicht 'getBookingFromUser'
  @Patch('cancel')
  async cancelBooking(@Query() query: BookingLookupDto): Promise<ResponseBookingDto> {
    return this.bookingsService.cancelBooking(query);
  }
}