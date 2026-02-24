import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// import { Room } from '../../rooms/entities/room.entity';
import { EntityManager, In, LessThan, MoreThan, Not, Repository } from 'typeorm';
// import { BookingPosition } from '../entities/booking-room';
import { BookingStatus } from '../dto/booking-response.dto';

@Injectable()
export class BookingAvailabilityService {

    // constructor(
    //     @InjectRepository(Room) private readonly roomRepo: Repository<Room>,
    //     @InjectRepository(BookingPosition) private readonly bookingPositionRepo: Repository<BookingPosition>
    //     ){}

    // async getAvailableRooms(hotelId: string, from: Date, to: Date): Promise<Room[]> {
    
    //     const searchFrom = new Date(from);
    //     searchFrom.setUTCHours(0, 0, 0, 0);

    //     const searchTo = new Date(to);
    //     searchTo.setUTCHours(0, 0, 0, 0);       

    //     const occupiedRooms = await this.bookingPositionRepo.find({
    //         relations: { booking: true },
    //         where: {
    //             booking: {
    //                 hotelId: hotelId,
    //                 status: BookingStatus.CONFIRMED as any, 
    //                 checkInDate: LessThan(searchTo),
    //                 checkOutDate: MoreThan(searchFrom)
    //             }
    //         },
    //         select: {
    //             roomId: true
    //         }
    //     });

    //     const occupiedRoomIds = occupiedRooms.map(bp => bp.roomId);

    //     if (occupiedRoomIds.length === 0) {
    //         return await this.roomRepo.find({
    //             where: { hotelId },
    //             select: {id: true}

    //         });
    //     }

    //     return await this.roomRepo.find({
    //         where: {
    //             hotelId,
    //             id: Not(In(occupiedRoomIds))
    //         },
    //         select: {id: true}
    //     });

        
    // }

    // async checkRoom(roomId: string, from: Date, to: Date, manager?: EntityManager): Promise<boolean> {
    //     const repo = manager ? manager.getRepository(BookingPosition) : this.bookingPositionRepo;
        
    //     const searchFrom = new Date(from);
    //     searchFrom.setUTCHours(0, 0, 0, 0);

    //     const searchTo = new Date(to);
    //     searchTo.setUTCHours(0, 0, 0, 0);   
        
    //     const conflictCount = await repo.count({
    //     relations: { booking: true },
    //     where: {
    //         roomId: roomId,
    //         booking: {
    //             status: BookingStatus.CONFIRMED as any, 
    //             checkInDate: LessThan(searchTo),
    //             checkOutDate: MoreThan(searchFrom)
    //         }
    //     }
    // });
        
    //     return conflictCount===0;
    // }

}
