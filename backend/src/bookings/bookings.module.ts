import { Module } from '@nestjs/common';

import { BookingsService } from './services/bookings.service';
import { PricingService } from './services/pricing.service';
import { BookingAvailabilityService } from './services/booking-availability.service';

import { BookingsController } from './controllers/bookings.controller';
import { OwnerBookingsControllerController } from './controllers/owner-bookings.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import {  Buchung } from './entities/booking.entity';
import {  BuchungZimmer } from './entities/booking-room.entity';
import { CaslModule } from '../_common/casl/casl.module';
import {  Zimmer } from '../rooms/entities/room.entity';
import { Zahlungsmethode } from './entities/zahlungsmethode.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Buchung, BuchungZimmer, Zimmer, Zahlungsmethode]), CaslModule],
  providers: [BookingsService, PricingService, BookingAvailabilityService],
  controllers: [BookingsController, OwnerBookingsControllerController],
  exports: [BookingAvailabilityService]
})
export class BookingsModule {}
