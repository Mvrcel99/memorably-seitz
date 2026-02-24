import { Module } from '@nestjs/common';
import { OwnerRoomImagesController } from './controllers/owner-room-images.controller';
import { RoomImagesService } from './services/room-images.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ZimmerBild } from './entities/room-image.entity';
import { Zimmer } from '../../rooms/entities/room.entity';
import { CaslModule } from '../../_common/casl/casl.module';

@Module({
  imports: [TypeOrmModule.forFeature([ZimmerBild, Zimmer]),CaslModule],
  controllers: [OwnerRoomImagesController],
  providers: [RoomImagesService]
})
export class RoomImageModule {}
