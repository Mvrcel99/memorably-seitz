import { Module } from '@nestjs/common';
import { HotelAusstattungService } from './hotel-ausstattung.service';
import { HotelAusstattungController } from './hotel-ausstattung.controller';

@Module({
  controllers: [HotelAusstattungController],
  providers: [HotelAusstattungService],
})
export class HotelAusstattungModule {}
