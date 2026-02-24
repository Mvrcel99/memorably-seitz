import { Module } from '@nestjs/common';
import { HotelbesitzerService } from './hotelbesitzer.service';
import { HotelbesitzerController } from './hotelbesitzer.controller';

@Module({
  controllers: [HotelbesitzerController],
  providers: [HotelbesitzerService],
})
export class HotelbesitzerModule {}
