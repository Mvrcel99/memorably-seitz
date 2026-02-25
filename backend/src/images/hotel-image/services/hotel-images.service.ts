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

    /**
     * BILD ERSTELLEN
     */
    async createHotelImage(hotelId: string, pfad: string, dto: CreateHotelImageDto, ownerId: number) {
        const hId = parseInt(hotelId);

        // 1. Hotel laden & Owner-Check
        const hotel = await this.hotelRepo.findOne({
            where: { hotel_id: hId },
            relations: ['besitzer']
        });

        if (!hotel) {
            throw new NotFoundException(`Hotel mit ID ${hotelId} wurde nicht gefunden.`);
        }

        // Vergleich der besitzer_id
        if (Number(hotel.besitzer?.benutzer_id) !== Number(ownerId)) {
            throw new ForbiddenException('Du bist nicht der Besitzer dieses Hotels.');
        }

        // 2. Sortierreihenfolge berechnen (Logik aus deinem Entwurf)
        const lastImage = await this.hotelBildRepo.findOne({
            where: { hotel: { hotel_id: hId } as any },
            // Da 'sortOrder' eventuell noch nicht in deiner DB ist, 
            // setze ich es hier als Kommentar, falls du es noch hinzufügen musst.
            // order: { sortOrder: 'DESC' }, 
        });

        let finalSortOrder = dto.sortOrder || 0;
        // Hier könnte man prüfen, ob die sortOrder bereits belegt ist...

        // 3. Neues Bild anlegen
        const newImage = this.hotelBildRepo.create({
            pfad: pfad,
            alt_text: dto.alt, // Mapping DTO 'alt' -> DB 'alt_text'
            hotel: { hotel_id: hId } as any,
            // sortOrder: finalSortOrder // Nur wenn in Entity vorhanden
        });

        const savedImage = await this.hotelBildRepo.save(newImage);

        return {
            message: 'Hotel-Bild wurde erfolgreich hochgeladen und gespeichert.',
            data: savedImage
        };
    }

    /**
     * BILD AKTUALISIEREN
     */
    async updateHotelImage(id: number, updateDto: UpdateHotelImageDto, userId: number) {
        const image = await this.hotelBildRepo.findOne({ 
            where: { hotel_bild_id: id }, 
            relations: ['hotel', 'hotel.besitzer'] 
        });

        if (!image) {
            throw new NotFoundException(`Bild mit der ID ${id} existiert nicht.`);
        }

        // Berechtigungs-Check
        if (Number(image.hotel.besitzer?.benutzer_id) !== Number(userId)) {
            throw new ForbiddenException('Du darfst nur Bilder deiner eigenen Hotels bearbeiten.');
        }

        if (updateDto.sortOrder && updateDto.sortOrder < 0) {
            throw new BadRequestException('Die Sortierreihenfolge darf nicht negativ sein.');
        }

        // Mapping für Update: alt -> alt_text
        if (updateDto.alt) {
            image.alt_text = updateDto.alt;
        }
        
        // sortOrder übernehmen, falls vorhanden
        if (updateDto.sortOrder !== undefined) {
            // image.sortOrder = updateDto.sortOrder;
        }

        try {
            return await this.hotelBildRepo.save(image);
        } catch (error) {
            throw new BadRequestException('Fehler beim Speichern der Bilddaten.');
        }
    }

    /**
     * BILD LÖSCHEN
     */
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