import { Injectable, ForbiddenException, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Zimmer } from '../entities/room.entity';
import { CreateRoomDto } from '../dto/create-room.dto'; 
import { UpdateRoomDto } from '../dto/update-room.dto';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Zimmer)
    private readonly zimmerRepository: Repository<Zimmer>,
  ) {}

  
  async createRoom(hotelId: string, dto: CreateRoomDto, ownerId: number) {
    const hId = parseInt(hotelId);

    const existingRoom = await this.zimmerRepository.findOne({
      where: { 
        hotel: { hotel_id: hId } as any, 
        zimmernr_hotel: dto.zimmernr_hotel 
      },
    });

    if (existingRoom) {
      throw new ConflictException(
        `Zimmer Nummer ${dto.zimmernr_hotel} existiert bereits in diesem Hotel.`
      );
    }
    
    const newRoom = this.zimmerRepository.create({
      ...dto,
      hotel: { hotel_id: hId } as any,
      zimmertyp: { id: dto.zimmertyp_id } as any
    });

    return await this.zimmerRepository.save(newRoom);
  }

  
  async updateRoom(roomId: string, hotelId: string, dto: UpdateRoomDto, userId: number) {
    const zId = parseInt(roomId);
    const hId = parseInt(hotelId);

    const room = await this.zimmerRepository.findOne({ 
      where: { 
        zimmer_id: zId, 
        hotel: { hotel_id: hId } as any 
      },
      relations: ['hotel', 'hotel.besitzer'] 
    });

    if (!room) {
      throw new NotFoundException('Zimmer wurde nicht gefunden');
    }

   
    const hotelBesitzerId = (room.hotel as any).besitzer_id || (room.hotel as any).besitzer?.benutzer_id;
    if (Number(hotelBesitzerId) !== Number(userId)) {
      throw new ForbiddenException('Keine Berechtigung zum Bearbeiten dieses Zimmers');
    }

    Object.assign(room, dto); 
    return await this.zimmerRepository.save(room);
  }

  async deleteRoom(roomId: string, userId: any, userRole: string): Promise<void> {
    const zId = parseInt(roomId);

   
    let room;
    try {
      room = await this.zimmerRepository.findOne({ 
        where: { zimmer_id: zId },
        relations: ['hotel', 'hotel.besitzer'] 
      });
    } catch (error) {
     
      throw new ConflictException('Datenbankfehler beim Abrufen des Zimmers.');
    }

  
    if (!room) {
      throw new NotFoundException(`Zimmer mit der ID ${roomId} existiert nicht.`);
    }

    
    const hotelBesitzerId = (room.hotel as any).besitzer_id || (room.hotel as any).besitzer?.benutzer_id;
    const isOwner = Number(hotelBesitzerId) === Number(userId);
    const isAdmin = userRole === 'admin';

    if (!isOwner && !isAdmin) {
     
      throw new ForbiddenException('Zugriff verweigert: Sie sind nicht der Eigentümer dieses Hotels.');
    }

    
    try {
      await this.zimmerRepository.remove(room);
    } catch (error) {
    
      throw new ConflictException(
        'Das Zimmer konnte nicht gelöscht werden. Möglicherweise bestehen noch aktive Buchungen.'
      );
    }
  }
}