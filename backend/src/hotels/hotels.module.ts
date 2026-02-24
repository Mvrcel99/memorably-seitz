import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { HotelsService } from './services/hotels.service';

import { HotelsController } from './controllers/hotels.controller';
import { OwnerHotelsController } from './controllers/owner-hotels.controller';
import { AdminHotelsController } from './controllers/admin-hotels.controller';
import { Hotel } from './entities/hotel.entity';

import { CaslModule } from '../_common/casl/casl.module';
import { HotelAusstattung } from '../features/entities/feature-hotel.entity';
import { Ausstattung } from '../features/entities/feature.entity';
import { BookingsModule } from '../bookings/bookings.module';



@Module({
  imports: [TypeOrmModule.forFeature([Hotel, HotelAusstattung, Ausstattung]), CaslModule, BookingsModule],
  controllers: [HotelsController, OwnerHotelsController, AdminHotelsController],
  providers: [HotelsService]

})
export class HotelsModule {}

