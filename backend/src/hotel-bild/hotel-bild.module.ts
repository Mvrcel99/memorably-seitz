import { Module } from '@nestjs/common';
import { HotelBildService } from './hotel-bild.service';
import { HotelBildController } from './hotel-bild.controller';

@Module({
  controllers: [HotelBildController],
  providers: [HotelBildService],
})
export class HotelBildModule {}
