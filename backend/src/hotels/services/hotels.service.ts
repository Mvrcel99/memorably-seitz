import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, ILike } from 'typeorm';
import { Hotel } from '../entities/hotel.entity';
import { HotelFilterDto } from '../dto/hotel-filter.dto';
import { HotelListItemDto } from '../dto/hotel-listitem.dto';
import { BookingAvailabilityService } from '../../bookings/services/booking-availability.service';
import { CreateHotelDto } from '../dto/create-hotel.dto';
import { UpdateHotelDto } from '../dto/update-hotel.dto';
import { HotelResponseDto } from '../dto/hotel-response.dto';
import { AuthenticatedUser } from '../../_common/casl/casl.utils';
import { HotelAusstattung } from '../../features/entities/feature-hotel.entity';

@Injectable()
export class HotelsService {
  constructor(
    @InjectRepository(Hotel)
    private readonly hotelRepo: Repository<Hotel>,
    private readonly availabilityService: BookingAvailabilityService,
    private readonly dataSource: DataSource,
  ) {}

  async createHotel(user: AuthenticatedUser, dto: CreateHotelDto): Promise<HotelResponseDto> {
    const newHotel = this.hotelRepo.create({
      name: dto.title,
      beschreibung: dto.description,
      ort: dto.city,
      land: dto.country,
      hotelsterne: dto.stars,
      besitzer_id: dto.ownerId || user.id,
      kostenlos_stornierbar_bis_stunden: dto.free_Cancellation_Until_Hours_Before_CheckIn || 24,
      strasse: 'Bitte ergänzen', 
      plz: '00000',
      stornogebuehr_prozent: 100
    });

    const savedHotel = await this.hotelRepo.save(newHotel);
    return this.mapToResponseDto(savedHotel);
  }

  async updateHotel(user: AuthenticatedUser, hotel_id: number, dto: UpdateHotelDto): Promise<HotelResponseDto> {
    const hotel = await this.hotelRepo.findOne({ where: { hotel_id } });
    if (!hotel) throw new NotFoundException('Hotel nicht gefunden.');

    const isAdmin = (user as any).role === 'admin';
    if (!isAdmin && hotel.besitzer_id !== user.id) {
      throw new ForbiddenException('Keine Berechtigung.');
    }

    return await this.dataSource.transaction(async (manager) => {
      const { featureIds, ...basicData } = dto;

      await manager.update(Hotel, hotel_id, {
        name: basicData.title,
        beschreibung: basicData.description,
        ort: basicData.city,
        land: basicData.country,
        hotelsterne: basicData.stars,
        kostenlos_stornierbar_bis_stunden: basicData.free_Cancellation_Until_Hours_Before_CheckIn,
      });

      if (featureIds) {
        await manager.delete(HotelAusstattung, { hotel_id });
        const newFeatures = featureIds.map(fId => manager.create(HotelAusstattung, {
          hotel_id: hotel_id,
          ausstattung_id: fId
        }));
        await manager.save(newFeatures);
      }

      const updated = await manager.findOne(Hotel, {
        where: { hotel_id },
        relations: ['zimmer', 'zimmer.bilder', 'bilder', 'hotelAusstattungen', 'hotelAusstattungen.ausstattung']
      });
      
      if (!updated) throw new NotFoundException('Hotel nach Update nicht gefunden.');
      return this.mapToResponseDto(updated);
    });
  }

  async searchHotels(filter: HotelFilterDto): Promise<HotelListItemDto[]> {
    const queryBuilder = this.hotelRepo.createQueryBuilder('hotel')
      .leftJoinAndSelect('hotel.zimmer', 'zimmer')
      .leftJoinAndSelect('hotel.bilder', 'bilder')
      .leftJoinAndSelect('hotel.hotelAusstattungen', 'ha')
      .leftJoinAndSelect('ha.ausstattung', 'ausstattung');

    if (filter.ort) {
      queryBuilder.andWhere('hotel.ort ILIKE :ort', { ort: `%${filter.ort}%` });
    }

    const hotels = await queryBuilder.getMany();

    if (filter.from && filter.to) {
      const availableHotels: HotelListItemDto[] = [];
      for (const hotel of hotels) {
        const freeRooms = await this.availabilityService.getAvailableRooms(
          hotel.hotel_id,
          new Date(filter.from),
          new Date(filter.to)
        );
        if (freeRooms.length > 0) {
          availableHotels.push(this.mapToListItemDto(hotel, Number(freeRooms[0].basispreis)));
        }
      }
      return availableHotels;
    }
    return hotels.map(h => this.mapToListItemDto(h));
  }

  async getHotelBySlug(slug: string): Promise<HotelResponseDto> {
    const formattedName = slug.replace(/-/g, ' ');
    const hotel = await this.hotelRepo.findOne({
      where: { name: ILike(formattedName) },
      relations: ['zimmer', 'zimmer.bilder', 'bilder', 'hotelAusstattungen', 'hotelAusstattungen.ausstattung']
    });
    if (!hotel) throw new NotFoundException(`Hotel "${formattedName}" nicht gefunden.`);
    return this.mapToResponseDto(hotel);
  }

  async getHotelsByOwner(ownerId: number): Promise<HotelResponseDto[]> {
    const hotels = await this.hotelRepo.find({
      where: { besitzer_id: ownerId },
      relations: ['zimmer', 'zimmer.bilder', 'bilder', 'hotelAusstattungen', 'hotelAusstattungen.ausstattung']
    });
    return hotels.map(hotel => this.mapToResponseDto(hotel));
  }

  async getHotelById(id: number): Promise<Hotel> {
    const hotel = await this.hotelRepo.findOne({
      where: { hotel_id: id },
      relations: ['zimmer', 'zimmer.bilder', 'bilder', 'hotelAusstattungen', 'hotelAusstattungen.ausstattung']
    });
    if (!hotel) throw new NotFoundException(`Hotel mit ID ${id} nicht gefunden.`);
    return hotel;
  }

  public mapToListItemDto(hotel: Hotel, startingPrice?: number): HotelListItemDto {
    return {
      hotelId: hotel.hotel_id,
      title: hotel.name,
      city: hotel.ort,
      stars: hotel.hotelsterne,
      minPricePerNight: startingPrice ?? (hotel.zimmer?.[0]?.basispreis || 0),
      previewImageUrl: hotel.bilder?.[0]?.pfad || '',
      country: hotel.land,
      slug: hotel.name.toLowerCase().replace(/\s+/g, '-'),
      featureIds: hotel.hotelAusstattungen?.map(ha => (ha as any).ausstattung_id) || []
    };
  }

  public mapToResponseDto(hotel: Hotel): HotelResponseDto {
    return {
      id: hotel.hotel_id.toString(),
      title: hotel.name,
      slug: hotel.name.toLowerCase().replace(/\s+/g, '-'),
      description: hotel.beschreibung,
      city: hotel.ort,
      country: hotel.land,
      stars: hotel.hotelsterne,
      features: hotel.hotelAusstattungen?.map(ha => ({
        ausstattung_id: ha.ausstattung?.ausstattung_id,
        titel: (ha.ausstattung as any)?.name || (ha.ausstattung as any)?.titel || 'Unbenannt',
        beschreibung: (ha.ausstattung as any)?.beschreibung || ''
      })) || [],
      images: hotel.bilder?.map(img => ({
        id: (img as any).hotel_bild_id || (img as any).id, 
        url: img.pfad,
        alt: hotel.name,
        sortOrder: 0
      })) || [],
      rooms: hotel.zimmer?.map(z => ({
        id: z.zimmer_id.toString(),
        zimmer_id: z.zimmer_id,
        zimmernr_hotel: (z as any).zimmernr_hotel || 0,
        bezeichnung: z.bezeichnung,
        beschreibung: (z as any).beschreibung || '',
        basispreis: Number(z.basispreis),
        zimmerTyp: (z as any).zimmerTyp || 'Standard',
        max_gaeste: (z as any).max_gaeste || 2,
        max_anzahl: (z as any).max_anzahl || (z as any).max_gaeste || 2,
        ist_verfügbar: true,
        bilder: z.bilder?.map(img => ({
          id: img.zimmer_bild_id,
          url: img.pfad,
          alt: z.bezeichnung,
          sortOrder: 0
        })) || []
      })) || []
    };
  }
}