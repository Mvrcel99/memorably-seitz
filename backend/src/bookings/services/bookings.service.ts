import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
//  import { Booking } from '../entities/booking.entity';
import { DataSource, In, Repository } from 'typeorm';
import { CreateBookingDto } from '../dto/create-booking.dto';
import { BookingStatus, ResponseBookingDto} from '../dto/booking-response.dto';
import { BookingLookupDto } from '../dto/booking-lookup.dto';
import { OwnerResponseBookingDto } from '../dto/booking-ownerResponse.dto';
// import { Room } from '../../rooms/entities/room.entity';
import { BookingAvailabilityService } from './booking-availability.service';
// import { BookingPosition } from '../entities/booking-room';

@Injectable()
export class BookingsService {

    // constructor(
    //     @InjectRepository(Booking) private readonly bookingRepo: Repository<Booking>,
    //     @InjectRepository(Room) private readonly roomRepo: Repository<Room>,
    //     private availabilityService: BookingAvailabilityService,
    //     private readonly dataSource: DataSource,
    // ) {}

    // // Public
    // async createBooking(createBookingDto: CreateBookingDto): Promise<ResponseBookingDto> {

    //     // Datum Überprüfung
    //     const checkInDate = new Date(createBookingDto.from);
    //     checkInDate.setUTCHours(0, 0, 0, 0);

    //     const checkOutDate = new Date(createBookingDto.to);
    //     checkOutDate.setUTCHours(0, 0, 0, 0);
        
    //     return await this.dataSource.transaction(async (manager) => {

    //         if (checkInDate >= checkOutDate) {
    //             throw new BadRequestException('Check-out muss nach Check-in liegen.');
    //         }

    //         // Räume Laden und checken
    //         const uniqueRoomIds = [...new Set(createBookingDto.roomIds)];
    //         const rooms = await this.roomRepo.find({
    //             where: { id: In(uniqueRoomIds) },
    //             relations: ['hotel'] 
    //         });

    //         if (rooms.length !== uniqueRoomIds.length) {
    //             throw new NotFoundException('Einer oder mehrere der angefragten Räume existieren nicht.');
    //         }

    //         // Hotel-Check (alle gleiches Hotel & aktiv)
    //         const firstHotel = rooms[0].hotel;
    //         if (!firstHotel.isActive) throw new BadRequestException('Hotel ist inaktiv.');
    //         if (rooms.some(r => r.hotelId !== firstHotel.id)) {
    //             throw new BadRequestException('Alle Räume müssen zum selben Hotel gehören.');
    //         }

    //         // Raum Check
    //         const conflicts: { roomId: string; reason: string }[] = [];

    //         for (const room of rooms) {
    //             const isAvailable = await this.availabilityService.checkRoom(
    //                 room.id, 
    //                 checkInDate, 
    //                 checkOutDate,
    //                 manager
    //             );
                
    //             if (!isAvailable) {
    //                 conflicts.push({
    //                     roomId: room.id,
    //                     reason: "OVERLAPPING_BOOKING"
    //                 });
    //             }
    //         }

    //         if (conflicts.length > 0) {
    //             throw new ConflictException({
    //                 error: "ROOM_NOT_AVAILABLE",
    //                 conflicts: conflicts
    //             });
    //         }

    //         // Preis für nächte berechnen

    //         const d1 = new Date(checkInDate);
    //         const d2 = new Date(checkOutDate);

    //         d1.setHours(12, 0, 0, 0);
    //         d2.setHours(12, 0, 0, 0);

    //         const nights = Math.floor((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24));
    //         let totalPrice = 0;
    //         rooms.forEach(r => totalPrice += (r.pricePerNight * nights));

    //         const booking = this.bookingRepo.create({
    //             email: createBookingDto.email,
    //             firstName: createBookingDto.firstName,
    //             lastName: createBookingDto.lastName,
    //             checkInDate: checkInDate,
    //             checkOutDate: checkOutDate,
    //             status: BookingStatus.CONFIRMED as any,
    //             hotelId: firstHotel.id,
    //             guests: createBookingDto.howMany,
    //             totalPrice: totalPrice,
    //             bookingCode: 'PENDING',
    //         });
            
    //         const savedBooking = await manager.save(booking);
    //         savedBooking.bookingCode = savedBooking.id.substring(0, 8).toUpperCase();
    //         await manager.save(savedBooking);

    //         const positions = rooms.map(room => {
    //             return manager.create(BookingPosition, {
    //                 bookingId: savedBooking.id,
    //                 roomId: room.id,
    //                 pricePerNight: room.pricePerNight
    //             });
    //         });

    //         await manager.save(positions);
    //         return this.mapToResponseDto(savedBooking, rooms);
    //     });
    // }

    // async getBookingFromUser(dto: BookingLookupDto): Promise<ResponseBookingDto> {
    //     const booking = await this.bookingRepo.findOne({
    //         where: { email: dto.email, bookingCode: dto.bookingCode },
    //         relations: ['hotel', 'positions', 'positions.room']
    //     });

    //     if (!booking) throw new NotFoundException('Buchung nicht gefunden.');
    //     return this.mapToResponseDto(booking);
    // }

    // async cancelBookingFromUser(bookingLookupDto: BookingLookupDto): Promise<ResponseBookingDto> {
    //     const booking = await this.bookingRepo.findOne({
    //         where: { email: bookingLookupDto.email, bookingCode: bookingLookupDto.bookingCode }
    //     });

    //     if (!booking) throw new NotFoundException('Buchung nicht gefunden.');
    //     if (booking.status === BookingStatus.CANCELLED) throw new BadRequestException('Buchung ist bereits storniert.');

    //     booking.status = BookingStatus.CANCELLED as any;
    //     booking.stornoDate = new Date();
        
    //     await this.bookingRepo.save(booking);

    //     return this.getBookingFromUser(bookingLookupDto);
    // }

    // // Owner
    // async getAllBookingsForOwner(userID: number): Promise<OwnerResponseBookingDto[]> {
    //     const bookings = await this.bookingRepo.find({
    //         where: { hotel: { ownerId: userID } },
    //         relations: ['hotel', 'positions', 'positions.room'],
    //     });

    //     return bookings.map(b => this.mapToResponseDto(b));
    // }

    // // utils

    // private mapToResponseDto(booking: Booking, rooms?: Room[]): ResponseBookingDto {
    //     const response = new ResponseBookingDto();
        
    //     response.id = booking.id;
    //     response.bookingCode = booking.bookingCode;
    //     response.status = booking.status;
    //     response.email = booking.email;
    //     response.firstName = booking.firstName;
    //     response.lastName = booking.lastName;
        
    //     response.from = booking.checkInDate instanceof Date 
    //         ? booking.checkInDate.toISOString().split('T')[0] 
    //         : booking.checkInDate;
            
    //     response.to = booking.checkOutDate instanceof Date 
    //         ? booking.checkOutDate.toISOString().split('T')[0] 
    //         : booking.checkOutDate;

    //     response.howMany = booking.guests;
    //     response.totalPrice = booking.totalPrice;
    //     response.createdAt = booking.createdAt.toISOString();
    //     response.stornoDate = booking.stornoDate ? new Date(booking.stornoDate).toISOString() : null;

    //     if (rooms) {
    //         response.rooms = rooms.map(r => ({
    //             id: r.id,
    //             name: r.name,
    //             pricePerNight: r.pricePerNight,
    //             hotel: {
    //                 id: r.hotel.id,
    //                 title: r.hotel.title,
    //                 city: r.hotel.city
    //             }
    //         }));
    //     } else if (booking.positions) {
    //         response.rooms = booking.positions.map(p => ({
    //             id: p.roomId,
    //             name: p.room?.name,
    //             pricePerNight: p.pricePerNight,
    //             hotel: {
    //                 id: booking.hotel?.id,
    //                 title: booking.hotel?.title,
    //                 city: booking.hotel?.city
    //             }
    //         }));
    //     }

    //     return response;
    // }
}
