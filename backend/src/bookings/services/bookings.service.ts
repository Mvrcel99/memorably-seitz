import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, In, Repository } from 'typeorm';
import { Buchung } from '../entities/booking.entity';
import { BuchungZimmer } from '../entities/booking-room.entity';
import { Zimmer } from '../../rooms/entities/room.entity';
import { Kunde } from '../../users/kunde.entity';
import { CreateBookingDto } from '../dto/create-booking.dto';
import { BookingLookupDto } from '../dto/booking-lookup.dto';
import { ResponseBookingDto } from '../dto/booking-response.dto';
import { OwnerResponseBookingDto } from '../dto/booking-ownerResponse.dto';
import { BookingAvailabilityService } from './booking-availability.service';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Buchung)
    private readonly bookingRepo: Repository<Buchung>,
    @InjectRepository(Zimmer)
    private readonly roomRepo: Repository<Zimmer>,
    private readonly availabilityService: BookingAvailabilityService,
    private readonly dataSource: DataSource,
  ) {}

  async getAllBookingsForOwner(ownerId: number): Promise<OwnerResponseBookingDto[]> {
    const bookings = await this.bookingRepo.createQueryBuilder('buchung')
      .leftJoinAndSelect('buchung.buchungZimmer', 'bz')
      .leftJoinAndSelect('bz.zimmer', 'zimmer')
      .leftJoinAndSelect('zimmer.hotel', 'hotel')
      .leftJoinAndSelect('buchung.kunde', 'kunde')
      .leftJoinAndSelect('kunde.benutzer', 'benutzer')
      .where('hotel.besitzer_id = :ownerId', { ownerId })
      .orderBy('buchung.checkin', 'DESC')
      .getMany();

    return bookings.map(b => this.mapToOwnerResponseDto(b));
  }

  async createBooking(dto: CreateBookingDto): Promise<ResponseBookingDto> {
    const checkInDate = new Date(dto.from);
    const checkOutDate = new Date(dto.to);

    return await this.dataSource.transaction(async (manager) => {
      
      if (checkInDate >= checkOutDate) {
        throw new BadRequestException('Check-out muss nach dem Check-in liegen.');
      }

     
      const kunde = await manager.getRepository(Kunde).findOne({
        where: { benutzer: { email: dto.email } },
        relations: ['benutzer']
      });

      if (!kunde) {
        throw new NotFoundException(`Kunde mit E-Mail ${dto.email} nicht gefunden.`);
      }

      
      const uniqueRoomIds = [...new Set(dto.roomIds)];
      const rooms = await this.roomRepo.find({
        where: { zimmer_id: In(uniqueRoomIds) },
        relations: ['hotel']
      });

      if (rooms.length !== uniqueRoomIds.length) {
        throw new NotFoundException('Eines oder mehrere Zimmer wurden nicht gefunden.');
      }

      
      for (const room of rooms) {
        const isAvailable = await this.availabilityService.checkRoom(
            room.zimmer_id, 
            checkInDate, 
            checkOutDate, 
            manager
        );
        
        if (!isAvailable) {
          throw new ConflictException(`Das Zimmer "${room.bezeichnung}" ist im gewählten Zeitraum bereits belegt.`);
        }
      }

     
      const nights = Math.max(1, Math.floor((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24)));
      const totalPricePerNight = rooms.reduce((sum, r) => sum + Number(r.basispreis), 0);

      
      const booking = manager.create(Buchung, {
        checkin: checkInDate,
        checkout: checkOutDate,
        anzahl_gaeste: dto.howMany,
        preis_pro_nacht: totalPricePerNight,
        zahlungsdatum: new Date(),
        kunde_id: kunde.benutzer_id,
         zahlungsmethode_id: dto.zahlungsmethode_id
      });

      const savedBooking = await manager.save(booking);

      
      const positions = rooms.map(room => manager.create(BuchungZimmer, {
        buchungs_id: savedBooking.buchungs_id,
        zimmer_id: room.zimmer_id,
        anzahl_gaeste: Math.ceil(dto.howMany / rooms.length),
        preis_pro_nacht: room.basispreis
      }));

      await manager.save(positions);

      return this.mapToResponseDto(savedBooking, rooms);
    });
  }

  async getBookingFromUser(query: BookingLookupDto): Promise<ResponseBookingDto> {
    const booking = await this.bookingRepo.findOne({
      where: {
        buchungs_id: Number(query.bookingCode),
        kunde: { benutzer: { email: query.email } }
      },
      relations: ['buchungZimmer', 'buchungZimmer.zimmer', 'buchungZimmer.zimmer.hotel', 'kunde', 'kunde.benutzer',   'zahlungsmethode'  ]
    });

    if (!booking) throw new NotFoundException('Buchung nicht gefunden.');
    return this.mapToResponseDto(booking, booking.buchungZimmer.map(bz => bz.zimmer));
  }

  async cancelBooking(query: BookingLookupDto): Promise<ResponseBookingDto> {
    const booking = await this.bookingRepo.findOne({
      where: {
        buchungs_id: Number(query.bookingCode),
        kunde: { benutzer: { email: query.email } }
      },
      relations: ['buchungZimmer', 'buchungZimmer.zimmer', 'buchungZimmer.zimmer.hotel', 'kunde', 'kunde.benutzer']
    });

    if (!booking) throw new NotFoundException('Buchung nicht gefunden.');
    if (booking.stornodatum) throw new BadRequestException('Diese Buchung wurde bereits storniert.');

    booking.stornodatum = new Date();
    const saved = await this.bookingRepo.save(booking);
    return this.mapToResponseDto(saved, booking.buchungZimmer.map(bz => bz.zimmer));
  }

  private mapToOwnerResponseDto(b: Buchung): OwnerResponseBookingDto {
    const checkinDate = new Date(b.checkin);
    const checkoutDate = new Date(b.checkout);
    const nights = Math.max(1, Math.floor((checkoutDate.getTime() - checkinDate.getTime()) / (1000 * 60 * 60 * 24)));

    const totalRaw = b.buchungZimmer?.reduce((sum, bz) => sum + (Number(bz.zimmer?.basispreis) * nights), 0) || 0;
    const total = parseFloat(totalRaw.toFixed(2));
    const net = parseFloat((total / 1.19).toFixed(2));

    return {
      id: b.buchungs_id,
      bookingCode: `RES-${b.buchungs_id}-${checkinDate.getFullYear()}`,
      status: (b.stornodatum ? 'CANCELLED' : 'CONFIRMED') as any,
      firstName: b.kunde?.benutzer?.vorname || 'N/A',
      lastName: b.kunde?.benutzer?.nachname || 'N/A',
      email: b.kunde?.benutzer?.email || 'N/A',
      from: checkinDate.toISOString().split('T')[0],
      to: checkoutDate.toISOString().split('T')[0],
      howMany: b.anzahl_gaeste,
      rooms: b.buchungZimmer?.map(bz => ({
        id: bz.zimmer?.zimmer_id,
        name: bz.zimmer?.bezeichnung,
        pricePerNight: parseFloat(Number(bz.zimmer?.basispreis).toFixed(2)),
        hotel: {
          id: bz.zimmer?.hotel?.hotel_id,
          title: bz.zimmer?.hotel?.name,
          city: bz.zimmer?.hotel?.ort
        }
      })) || [],
      totalPrice: total,
      netAmount: net,
      createdAt: b.zahlungsdatum ? new Date(b.zahlungsdatum).toISOString() : new Date().toISOString(),
      stornoDate: b.stornodatum ? new Date(b.stornodatum).toISOString() : null
    };
  }

  private mapToResponseDto(booking: Buchung, rooms: Zimmer[]): ResponseBookingDto {
    const checkinDate = new Date(booking.checkin);
    const checkoutDate = new Date(booking.checkout);
    const nights = Math.max(1, Math.floor((checkoutDate.getTime() - checkinDate.getTime()) / (1000 * 60 * 60 * 24)));

    const response = new ResponseBookingDto();
    response.id = booking.buchungs_id;
    response.bookingCode = booking.buchungs_id.toString();
    response.status = (booking.stornodatum ? 'CANCELLED' : 'CONFIRMED') as any;
    response.email = booking.kunde?.benutzer?.email || '';
    response.firstName = booking.kunde?.benutzer?.vorname || '';
    response.lastName = booking.kunde?.benutzer?.nachname || '';
    response.from = checkinDate.toISOString().split('T')[0];
    response.to = checkoutDate.toISOString().split('T')[0];
    response.howMany = booking.anzahl_gaeste;
    response.createdAt = booking.zahlungsdatum ? new Date(booking.zahlungsdatum).toISOString() : new Date().toISOString();
    response.stornoDate = booking.stornodatum ? new Date(booking.stornodatum).toISOString() : null;
    
    const firstHotel = booking.buchungZimmer?.[0]?.zimmer?.hotel;
    response.zahlungsmethode_id = booking.zahlungsmethode_id ?? null;
    response.zahlungsmethode = booking.zahlungsmethode?.bezeichnung ?? null;
    response.stornogebuehr_prozent = firstHotel?.stornogebuehr_prozent ?? null;
    response.kostenlos_stornierbar_bis_stunden = firstHotel?.kostenlos_stornierbar_bis_stunden ?? null;

    response.rooms = rooms.map(r => ({
      id: r.zimmer_id,
      name: r.bezeichnung,
      pricePerNight: Number(r.basispreis),
      hotel: { 
        id: r.hotel?.hotel_id, 
        title: r.hotel?.name, 
        city: r.hotel?.ort 
      }
    }));
    
    response.totalPrice = parseFloat(rooms.reduce((sum, r) => sum + (Number(r.basispreis) * nights), 0).toFixed(2));
    
    return response;
  }
}