import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { HotelListItemDto } from '../dto/hotel-listitem.dto';
import { HotelResponseDto } from '../dto/hotel-response.dto';
import { CreateHotelDto } from '../dto/create-hotel.dto';
import { AuthenticatedUser, UserRole } from '../../_common/casl/casl.utils';
import { Hotel } from '../entities/hotel.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, In, Repository } from 'typeorm';
import { UpdateHotelDto } from '../dto/update-hotel.dto';
import {  } from '../../users/user.entity';


import { BookingAvailabilityService } from '../../bookings/services/booking-availability.service';
import { HotelAusstattung } from '../../features/entities/feature-hotel.entity';
import { Ausstattung } from '../../features/entities/feature.entity';



@Injectable()
export class HotelsService {

    // constructor(
    // @InjectRepository(Hotel) private readonly hotelRepo: Repository<Hotel>,
    // @InjectRepository(HotelAusstattung) private readonly HotelAusstattungRepo: Repository<HotelAusstattung>,
    // @InjectRepository(Ausstattung) private readonly AusstattungRepo: Repository<Ausstattung>,
    // private readonly bookingAvailabilityService: BookingAvailabilityService
    // ){}

    // // Public
    // async searchHotels(city?: string, from?: Date, to?: Date, guests: number = 1): Promise<HotelListItemDto[]> {

    //     if(to && from && to <= from) {
    //         throw new BadRequestException("Das Enddatum muss nach dem Startdatum liegen.");
    //     }
        
    //     let hotels = await this.hotelRepo.find({
    //         where: {
    //             isActive: true,
    //             city: city ? ILike(`%${city}%`) : undefined          
    //         },
    //         relations: [
    //             'HotelAusstattungs',          
    //             'HotelAusstattungs.Ausstattung',    
    //             'images',         
    //             'rooms',          
    //             'rooms.roomImages'    
    //         ],
    //         order: {
    //             id: 'ASC',
    //             images: { sort_order: 'ASC' },        
    //             rooms: { 
    //                 pricePerNight: 'ASC',              
    //                 roomImages: { sort_order: 'ASC' }      
    //             }
    //         }
    //     });

    //     if (from && to) {
    //         await Promise.all(hotels.map(async (hotel) => {
    //             const availableRooms = await this.bookingAvailabilityService.getAvailableRooms(hotel.id, from, to);
    //             hotel.rooms = hotel.rooms.filter(r => availableRooms.some(ar => ar.id === r.id));
    //         }));
    //     }

    //     hotels.forEach(hotel => {
    //         if (hotel.rooms) {
    //             hotel.rooms = hotel.rooms.filter(r => r.maxGuests >= guests);
    //         }
    //     });

    //     hotels = hotels.filter(hotel => hotel.rooms && hotel.rooms.length > 0)

    //     if(hotels.length === 0) {
    //         throw new NotFoundException('Keine Hotels gefunden');
    //     }

    //     return hotels.map(hotel => {
    //         const previewImage = hotel.images && hotel.images.length > 0 
    //             ? hotel.images[0].imageUrl 
    //             : '/placeholder.jpg'; 

    //         let minPrice = 0;
    //         if (hotel.rooms && hotel.rooms.length > 0) {
    //             const validRooms = hotel.rooms.filter(r => r.maxGuests >= guests);
    //             if (validRooms.length > 0) {
    //                 minPrice = Math.min(...validRooms.map(r => r.pricePerNight));
    //             }
    //         }

    //         const AusstattungIds = hotel.HotelAusstattungs 
    //             ? hotel.HotelAusstattungs.map(hf => hf.AusstattungId) 
    //             : [];

    //         return {
    //             hotelId: hotel.id,
    //             title: hotel.title,
    //             slug: hotel.slug,
    //             city: hotel.city,
    //             country: hotel.country,
    //             stars: hotel.stars,
    //             latitude: hotel.latitude,
    //             longitude: hotel.longitude,
    //             previewImageUrl: previewImage,
    //             minPricePerNight: minPrice,
    //             AusstattungIds: AusstattungIds
    //         };
    //     });
    // }

    // async getHotelDetailBySlug(slug: string): Promise<HotelResponseDto>{

    //     const hotel = await this.hotelRepo.findOne({
    //     where: { slug, isActive: true }, 
    //     relations: [
    //         'HotelAusstattungs',          
    //         'HotelAusstattungs.Ausstattung',    
    //         'images',         
    //         'rooms',          
    //         'rooms.roomImages'    
    //     ],
    //     order: {
    //         images: { sort_order: 'ASC' },        
    //         rooms: { 
    //             pricePerNight: 'ASC',              
    //             roomImages: { sort_order: 'ASC' }      
    //         }
    //     }
    //     });

    //     if (!hotel) {
    //     throw new NotFoundException(`Hotel mit dem Slug "${slug}" nicht gefunden.`);
    //     }

    //     return this.hotelResponseDTOmapping(hotel)
    // }

    // // Admin
    // async createHotel(user: AuthenticatedUser, dto: CreateHotelDto) {
    
    //     // Admin Check
    //     if(user.role != UserRole.ADMIN)
    //     {
    //         throw new ForbiddenException('Nur Admins dürfen Hotels anlegen.');
    //     }

    //     // slug check
    //     const newSlug = dto.title.toLowerCase().replace(/ /g, '-');
    //     const existingHotel = await this.hotelRepo.findOneBy({ slug: newSlug });
    //     if (existingHotel) {
    //         throw new BadRequestException('Ein Hotel mit diesem Titel existiert bereits. Bitte wählen Sie einen anderen Titel.');
    //     }

    //     const newHotel = this.hotelRepo.create({
    //         ...dto,       
    //         slug: newSlug
    //     });

    //     const savedHotel = await this.hotelRepo.save(newHotel);

    //     return savedHotel;
    // }

    // // Owner
    // async getHotelsByOwner(ownerId: number): Promise<HotelResponseDto []> {

    //     const hotels = await this.hotelRepo.find({
    //     where: { ownerId }, 
    //     relations: [
    //         'HotelAusstattungs',          
    //         'HotelAusstattungs.Ausstattung',
    //         'images',    
    //         'rooms',          
    //         'rooms.roomImages'    
    //     ],
    //     order: {
    //         images: { sort_order: 'ASC' },        
    //         rooms: { 
    //             pricePerNight: 'ASC',              
    //             roomImages: { sort_order: 'ASC' }      
    //         }
    //     }
    //     });

    //     if(!hotels){
    //     throw new NotFoundException(`Kein Hotel zu diesem User gefunden!`);
    //     }
            

    //     return hotels.map(h => this.hotelResponseDTOmapping(h))

    // }

    // // Update Hotel (Admin & Owner)
    // async updateHotel(user: AuthenticatedUser, hotelId: string, updateHotelDto: UpdateHotelDto): Promise<HotelResponseDto> {

    //     let queryOption: any;

    //     if (user.role === UserRole.HotelOwner) {
    //         queryOption = { id: hotelId, ownerId: user.id };
    //     } else {
    //         queryOption = { id: hotelId };
    //     }

    //     let hotel = await this.hotelRepo.findOne({
    //     where: queryOption,
    //     });

    //     if (!hotel) {
    //         throw new NotFoundException('Hotel nicht gefunden oder keine Zugriffsberechtigung.');
    //     }

    //     if (updateHotelDto.AusstattungIds) {
            
    //         const foundAusstattungs = await this.AusstattungRepo.findBy({
    //             id: In(updateHotelDto.AusstattungIds)
    //         });

    //         if (foundAusstattungs.length !== updateHotelDto.AusstattungIds.length) {
    //             throw new BadRequestException('Einige der angegebenen Ausstattung-IDs existieren nicht.');
    //         }

    //         await this.HotelAusstattungRepo.delete({ hotelId: hotel.id });

    //         if (updateHotelDto.AusstattungIds.length > 0) {
    //             const newHotelAusstattungs = updateHotelDto.AusstattungIds.map(fId => {
    //                 const hf = new HotelAusstattung();
    //                 hf.hotelId = hotel.id;
    //                 hf.AusstattungId = fId;
    //                 return hf;
    //             });

    //             await this.HotelAusstattungRepo.save(newHotelAusstattungs);
    //         }
    //     }

    //     const { AusstattungIds, ...otherData } = updateHotelDto;

    //     Object.assign(hotel, otherData);

    //     await this.hotelRepo.save(hotel);

    //     return this.getHotelDetailBySlug(hotel.slug);

    // }

    // // utils
    // hotelResponseDTOmapping (hotel: Hotel): HotelResponseDto{
    //     return{
    //         id: hotel.id,
    //         title: hotel.title,
    //         slug: hotel.slug,
    //         description: hotel.description,
    //         city: hotel.city,
    //         country: hotel.country,
    //         stars: hotel.stars,
            
    //         // Mapping der Ausstattungs
    //         Ausstattungs: hotel.HotelAusstattungs?.map(hf => ({
    //             id: hf.Ausstattung.id,
    //             label: hf.Ausstattung.label
    //         })) || [],

    //         // Mapping der Hotel-Bilder
    //         images: hotel.images?.map(img => ({
    //             id: img.id,
    //             url: img.imageUrl,
    //             alt: img.alt,
    //             sortOrder: img.sort_order
    //         })) || [],

    //         // Mapping der Rooms inkl. deren Bilder
    //         rooms: hotel.rooms?.map(room => ({
    //             id: room.id,
    //             name: room.name,
    //             description: room.description,
    //             pricePerNight: room.pricePerNight,
    //             maxGuests: room.maxGuests,
    //             images: room.roomImages?.map(rImg => ({
    //                 id: rImg.id,
    //                 url: rImg.imageUrl,
    //                 alt: rImg.alt,
    //                 sortOrder: rImg.sort_order
    //             })) || []
    //         })) || []
    //     };
    // }
    
}

