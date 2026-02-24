import { Injectable, ForbiddenException, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// import { Room } from '../entities/room.entity'; 
import { CreateRoomDto } from '../dto/create-room.dto'; 
import { UpdateRoomDto } from '../dto/update-room.dto';

@Injectable()
export class RoomsService {
//   constructor(
//     @InjectRepository(Room)
//     private readonly roomRepository: Repository<Room>,
//   ) {}


//    // create-room.dto.ts
//   async createRoom(hotelId: string, dto: CreateRoomDto, ownerId: number) {

//     const existingRoom = await this.roomRepository.findOne({
//     where: { 
//       hotelId: hotelId, 
//       roomNumber: dto.roomNumber 
//     },
//   });

//   if (existingRoom) {
//     throw new ConflictException(
//       `Raum Nummer ${dto.roomNumber} ist bereits für dieses Hotel ${existingRoom.hotelId} registriert.`
//     );
//   }
  
//     const newRoom = this.roomRepository.create({
//       ...dto,
//       hotelId: hotelId,
//       ownerId: ownerId,
//     });

//     return await this.roomRepository.save(newRoom);
//   }
//   // Update-Room.dto.ts
// async updateRoom(roomId: string, hotelId: string, dto: UpdateRoomDto, ownerId: number) {

//   const room = await this.roomRepository.findOne({ 
//     where: { id: roomId, hotelId: hotelId, ownerId: ownerId } 
//   });

//   if (!room) {
//     throw new ForbiddenException('Zimmer nicht gefunden oder keine Berechtigung');
//   }

//   Object.assign(room, dto);

//   return await this.roomRepository.save(room);
// }
// async deleteRoom(roomId: string, userId: number): Promise<void> {

//   const room = await this.roomRepository.findOne({ 
//     where: { id: roomId },
//     relations: ['hotel'] 
//   });


//   if (!room) {
//     throw new NotFoundException('Zimmer wurde nicht gefunden');
//   }


//   if (room.hotel.ownerId !== userId) {
//     throw new ForbiddenException('Keine Berechtigung: Dieses Hotel gehört dir nicht.');
//   }


//   await this.roomRepository.remove(room);
// } // delelteRoom hat keine DTO
}

