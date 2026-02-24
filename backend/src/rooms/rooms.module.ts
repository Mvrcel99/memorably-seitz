import { Module } from '@nestjs/common';
import { OwnerRoomsController } from './controllers/owner-rooms.controller';
import { RoomsService } from './services/rooms.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Zimmer } from './entities/room.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Zimmer]),],
  controllers: [OwnerRoomsController],
  providers: [RoomsService]
})
export class RoomsModule {}
