import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan, MoreThan, EntityManager, IsNull } from 'typeorm'; 
import { BuchungZimmer } from '../entities/booking-room.entity';
import { Zimmer } from '../../rooms/entities/room.entity';

@Injectable()
export class BookingAvailabilityService {
  constructor(
    @InjectRepository(BuchungZimmer)
    private readonly buchungZimmerRepo: Repository<BuchungZimmer>,
    @InjectRepository(Zimmer)
    private readonly zimmerRepo: Repository<Zimmer>,
  ) {}

  async getAvailableRooms(hotel_id: number, from: Date, to: Date): Promise<Zimmer[]> {
    
    const allRooms = await this.zimmerRepo.find({
      where: { hotel: { hotel_id: hotel_id } } as any
    });

    
    const occupiedRoomItems = await this.buchungZimmerRepo.find({
      relations: ['buchung', 'zimmer', 'zimmer.hotel'],
      where: {
        zimmer: { 
          hotel: { hotel_id: hotel_id } 
        } as any,
        buchung: {
          checkin: LessThan(to),
          checkout: MoreThan(from),
          stornodatum: IsNull(), 
        } as any
      }
    });

    const occupiedRoomIds = occupiedRoomItems.map(item => item.zimmer_id);

    
    return allRooms.filter(room => !occupiedRoomIds.includes(room.zimmer_id));
  }

  async checkRoom(zimmer_id: number, from: Date, to: Date, manager?: EntityManager): Promise<boolean> {
    const repo = manager ? manager.getRepository(BuchungZimmer) : this.buchungZimmerRepo;
    
    const count = await repo.count({
      relations: ['buchung'],
      where: {
        zimmer_id: zimmer_id,
        buchung: {
          checkin: LessThan(to),
          checkout: MoreThan(from),
          stornodatum: IsNull(), 
        } as any
      }
    });


    return count === 0;
  }
}