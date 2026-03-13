import { Module } from '@nestjs/common';
import { BewertungService } from './bewertung.service';
import { BewertungController } from './bewertung.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bewertung } from './entities/bewertung.entity';
import { Buchung } from '../bookings/entities/booking.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Bewertung, Buchung])],
  controllers: [BewertungController],
  providers: [BewertungService],
})
export class BewertungModule {}
