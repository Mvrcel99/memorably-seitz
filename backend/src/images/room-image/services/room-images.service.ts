import { ForbiddenException, Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ZimmerBild } from '../entities/room-image.entity';
import { Zimmer } from '../../../rooms/entities/room.entity';
import { CreateRoomImageDto } from '../dto/create-roomImage.dto';
import { UpdateRoomImageDto } from '../dto/update-room-image.dto';
import * as fs from 'fs/promises';
import * as path from 'path';

@Injectable()
export class RoomImagesService {
    constructor(
        @InjectRepository(ZimmerBild)
        private readonly zimmerBildRepo: Repository<ZimmerBild>,
        @InjectRepository(Zimmer)
        private readonly zimmerRepo: Repository<Zimmer>,
    ) {}

    /**
     * ZIMMER-BILD ERSTELLEN
     */
    async createRoomImage(roomId: number, hotelId: number, pfad: string, dto: CreateRoomImageDto, ownerId: number) {
        // 1. Zimmer laden und prüfen, ob es zum Hotel & Besitzer gehört
        const zimmer = await this.zimmerRepo.findOne({
            where: { zimmer_id: roomId, hotel: { hotel_id: hotelId } as any },
            relations: ['hotel', 'hotel.besitzer']
        });

        if (!zimmer) {
            throw new NotFoundException(`Zimmer mit ID ${roomId} wurde in diesem Hotel nicht gefunden.`);
        }

        // Sicherheits-Check: Gehört das Hotel dem User?
        if (Number(zimmer.hotel.besitzer?.benutzer_id) !== Number(ownerId)) {
            throw new ForbiddenException('Du bist nicht der Besitzer dieses Hotels.');
        }

        // 2. Datenbankeintrag erstellen
        const neuesBild = this.zimmerBildRepo.create({
            pfad: pfad,
            alt_text: dto.alt,
            zimmer: { zimmer_id: roomId } as any
            // Falls sortOrder in Entity: sort_order: dto.sortOrder
        });

        const savedImage = await this.zimmerBildRepo.save(neuesBild);

        return {
            message: 'Raumbild wurde erfolgreich hochgeladen und erstellt.',
            data: savedImage
        };
    }

    /**
     * ZIMMER-BILD LÖSCHEN (DB + Dateisystem)
     */
    async removeRoomImage(id: number, ownerId: number) {
        // Bild laden mit vollständiger Kette zum Besitzer
        const image = await this.zimmerBildRepo.findOne({
            where: { zimmer_bild_id: id },
            relations: ['zimmer', 'zimmer.hotel', 'zimmer.hotel.besitzer']
        });

        if (!image) {
            throw new NotFoundException('Raum-Bild wurde in der Datenbank nicht gefunden.');
        }

        // Owner-Check
        const besitzerId = image.zimmer?.hotel?.besitzer?.benutzer_id;
        if (Number(besitzerId) !== Number(ownerId)) {
            throw new ForbiddenException('Zugriff verweigert: Sie sind nicht der Besitzer.');
        }

        // Physische Datei vom Server löschen
        const filename = image.pfad.replace(/^\//, ''); // Entfernt führenden Slash
        const fullPath = path.join(process.cwd(), filename);

        try {
            await fs.access(fullPath); 
            await fs.unlink(fullPath);
            console.log(`Datei erfolgreich gelöscht: ${fullPath}`);
        } catch (err) {
            console.warn(`Datei konnte im Filesystem nicht gelöscht werden: ${fullPath}`);
        }

        // Datenbankeintrag löschen
        return await this.zimmerBildRepo.remove(image);
    }

    /**
     * ZIMMER-BILD AKTUALISIEREN
     */
    async updateRoomImage(id: number, dto: UpdateRoomImageDto, ownerId: number) {
        const image = await this.zimmerBildRepo.findOne({
            where: { zimmer_bild_id: id },
            relations: ['zimmer', 'zimmer.hotel', 'zimmer.hotel.besitzer']
        });

        if (!image) throw new NotFoundException('Raum-Bild nicht gefunden');

        if (Number(image.zimmer.hotel.besitzer?.benutzer_id) !== Number(ownerId)) {
            throw new ForbiddenException('Nicht dein Raum!');
        }

        // Mapping DTO 'alt' -> DB 'alt_text'
        if (dto.alt !== undefined) image.alt_text = dto.alt;
        
        return await this.zimmerBildRepo.save(image);
    }
}