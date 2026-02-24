import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// import { Room } from '../../rooms/entities/room.entity';
// import { HotelImage } from '../entities/hotel-image.entity';
import { Hotel } from '../../../hotels/entities/hotel.entity';
import { CreateHotelImageDto } from '../dto/create-hotelImage.dto';
import{UpdateHotelImageDto} from '../dto/update-hotel-image.dto';
import * as fs from 'fs';
import * as path from 'path';
import{ BadRequestException } from '@nestjs/common';



@Injectable()
export class HotelImagesService {
//     constructor(
//         @InjectRepository(HotelImage)
//         private readonly hotelImageRepo: Repository<HotelImage>,
//         @InjectRepository(Hotel)
//         private readonly hotelRepo: Repository<Hotel>,
//     ) {}

//     async createHotelImage(hotelId: string, imageUrl:string, dto: CreateHotelImageDto, ownerId:number ){
 
//         const lastImage = await this.hotelImageRepo.findOne({
//             where: { hotelId },
//             order: { sort_order: 'DESC' }, // Höchste Zahl zuerst
            
//         });

//         let finalSortOrder = dto.sortOrder;

//         if (finalSortOrder !== undefined) {
//             const existing = await this.hotelImageRepo.findOne({
//             where: { hotelId, sort_order: finalSortOrder }
//         });

//         if (existing) {
//             finalSortOrder = lastImage ? lastImage.sort_order + 1 : 0;
//         }
//         } else {
//             finalSortOrder = lastImage ? lastImage.sort_order + 1 : 0;
//         }

//         const hotel = await this.hotelRepo.findOne({
//             where: { id: hotelId },
//         });

//         if (!hotel) {
//             throw new NotFoundException(`Hotel mit ID ${hotelId} wurde nicht gefunden.`);
//         }

//         if (String(hotel.ownerId) !== String(ownerId)) {
//             throw new ForbiddenException('Du bist nicht der Besitzer dieses Hotels.');
//         }

//         const newImage = this.hotelImageRepo.create({
//             hotelId: hotelId,
//             imageUrl: imageUrl,
//             alt: dto.alt,
//             sort_order: finalSortOrder,
//         });
       
//         const savedImage = await this.hotelImageRepo.save(newImage);

//         return {
//             message: 'Hotel-Bild wurde erfolgreich hochgeladen und gespeichert.',
//             data: savedImage
//         };
        
     
        
//     }
//    async updateHotelImage(id: number, updateDto: UpdateHotelImageDto, userId: string) {
  
//   const image = await this.hotelImageRepo.findOne({ 
//     where: { id }, 
//     relations: ['hotel'] 
//   });

  
//   if (!image) {
//     throw new NotFoundException(`Bild mit der ID ${id} existiert nicht.`);
//   }

 
//   if (String(image.hotel.ownerId) !== String(userId)) {
//     throw new ForbiddenException('Du darfst nur Bilder deiner eigenen Hotels bearbeiten.');
//   }

 
//   if (updateDto.sortOrder && updateDto.sortOrder < 0) {
//     throw new BadRequestException('Die Sortierreihenfolge darf nicht negativ sein.');
//   }

  
//   Object.assign(image, updateDto);
  
//   try {
//     return await this.hotelImageRepo.save(image);
//   } catch (error) {

//     throw new BadRequestException('Fehler beim Speichern der Bilddaten.');
//   }
//  }
//     async removeHotelImage(id: number, userId: string) {
  
//   const image = await this.hotelImageRepo.findOne({ where: { id }, relations: ['hotel'] });

 
//   if (!image) {
//     throw new NotFoundException(`Bild mit der ID ${id} wurde nicht gefunden.`);
//   }


//   if (String(image.hotel.ownerId) !== String(userId)) {
//   throw new ForbiddenException('Du hast keine Berechtigung für diese Aktion.');
//     }


//   await this.hotelImageRepo.remove(image);
//   return { message: 'Bild erfolgreich gelöscht' };
// }

}
