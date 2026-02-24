

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OwnerHotelImagesController } from './controllers/owner-hotel-images.controller';
import { HotelImagesService } from './services/hotel-images.service';
import { CaslModule } from '../../_common/casl/casl.module';
import { Hotel } from '../../hotels/entities/hotel.entity';
import { HotelBild } from './entities/hotel-image.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([HotelBild, Hotel]), 
    CaslModule
  ],
  controllers: [OwnerHotelImagesController],
  providers: [HotelImagesService],
  exports: [HotelImagesService] 
})

export class HotelImageModule {}

