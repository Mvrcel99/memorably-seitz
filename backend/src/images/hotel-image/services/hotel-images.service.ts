import { ForbiddenException, Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HotelBild } from '../entities/hotel-image.entity';
import { Hotel } from '../../../hotels/entities/hotel.entity';
import { CreateHotelImageDto } from '../dto/create-hotelImage.dto';
import { UpdateHotelImageDto } from '../dto/update-hotel-image.dto';

@Injectable()
export class HotelImagesService {
    constructor(
        @InjectRepository(HotelBild)
        private readonly hotelBildRepo: Repository<HotelBild>,
        @InjectRepository(Hotel)
        private readonly hotelRepo: Repository<Hotel>,
    ) {}

    
    async createHotelImage(hotelId: string, pfad: string, dto: CreateHotelImageDto, ownerId: number) {
        const hId = parseInt(hotelId);

       
        const hotel = await this.hotelRepo.findOne({
            where: { hotel_id: hId },
            relations: ['besitzer']
        });

        if (!hotel) {
            throw new NotFoundException(`Hotel mit ID ${hotelId} wurde nicht gefunden.`);
        }

     
        if (Number(hotel.besitzer?.benutzer_id) !== Number(ownerId)) {
            throw new ForbiddenException('Du bist nicht der Besitzer dieses Hotels.');
        }

        
        const lastImage = await this.hotelBildRepo.findOne({
            where: { hotel: { hotel_id: hId } as any },
       
        });

        let finalSortOrder = dto.sortOrder || 0;
      
        const newImage = this.hotelBildRepo.create({
            pfad: pfad,
            alt_text: dto.alt, 
            hotel: { hotel_id: hId } as any,
           
        });

        const savedImage = await this.hotelBildRepo.save(newImage);

        return {
            message: 'Hotel-Bild wurde erfolgreich hochgeladen und gespeichert.',
            data: savedImage
        };
    }

  
    async updateHotelImage(id: number, updateDto: UpdateHotelImageDto, userId: number) {
        const image = await this.hotelBildRepo.findOne({ 
            where: { hotel_bild_id: id }, 
            relations: ['hotel', 'hotel.besitzer'] 
        });

        if (!image) {
            throw new NotFoundException(`Bild mit der ID ${id} existiert nicht.`);
        }

       
        if (Number(image.hotel.besitzer?.benutzer_id) !== Number(userId)) {
            throw new ForbiddenException('Du darfst nur Bilder deiner eigenen Hotels bearbeiten.');
        }

        if (updateDto.sortOrder && updateDto.sortOrder < 0) {
            throw new BadRequestException('Die Sortierreihenfolge darf nicht negativ sein.');
        }

       
        if (updateDto.alt) {
            image.alt_text = updateDto.alt;
        }
        
       
        if (updateDto.sortOrder !== undefined) {
            
        }

        try {
            return await this.hotelBildRepo.save(image);
        } catch (error) {
            throw new BadRequestException('Fehler beim Speichern der Bilddaten.');
        }
    }

   
    async removeHotelImage(id: number, userId: number) {
        const image = await this.hotelBildRepo.findOne({ 
            where: { hotel_bild_id: id }, 
            relations: ['hotel', 'hotel.besitzer'] 
        });

        if (!image) {
            throw new NotFoundException(`Bild mit der ID ${id} wurde nicht gefunden.`);
        }

        if (Number(image.hotel.besitzer?.benutzer_id) !== Number(userId)) {
            throw new ForbiddenException('Du hast keine Berechtigung für diese Aktion.');
        }

        await this.hotelBildRepo.remove(image);
        return { message: 'Bild erfolgreich gelöscht' };
    }
}