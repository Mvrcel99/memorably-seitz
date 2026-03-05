import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
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

    async createRoomImage(roomId: number, hotelId: number, pfad: string, dto: CreateRoomImageDto, ownerId: number) {
        const zimmer = await this.zimmerRepo.findOne({
            where: { zimmer_id: roomId, hotel: { hotel_id: hotelId } as any },
            relations: ['hotel', 'hotel.besitzer']
        });

        if (!zimmer) {
            throw new NotFoundException(`Zimmer mit ID ${roomId} wurde in diesem Hotel nicht gefunden.`);
        }

        if (Number(zimmer.hotel.besitzer?.benutzer_id) !== Number(ownerId)) {
            throw new ForbiddenException('Du bist nicht der Besitzer dieses Hotels.');
        }

        // KORREKTUR: Wir bauen den Pfad für die DB so um, dass er den Unterordner enthält
        // Aus "/images/dateiname.png" wird "/images/room/dateiname.png"
        const dbPfad = pfad.replace('/images/', '/images/room/');

        const neuesBild = this.zimmerBildRepo.create({
            pfad: dbPfad,
            alt_text: dto.alt,
            zimmer: { zimmer_id: roomId } as any
        });

        const savedImage = await this.zimmerBildRepo.save(neuesBild);

        return {
            message: 'Raumbild wurde erfolgreich hochgeladen und erstellt.',
            data: savedImage
        };
    }

    async removeRoomImage(id: number, ownerId: number) {
        const image = await this.zimmerBildRepo.findOne({
            where: { zimmer_bild_id: id },
            relations: ['zimmer', 'zimmer.hotel', 'zimmer.hotel.besitzer']
        });

        if (!image) {
            throw new NotFoundException('Raum-Bild wurde in der Datenbank nicht gefunden.');
        }

        const besitzerId = image.zimmer?.hotel?.besitzer?.benutzer_id;
        if (Number(besitzerId) !== Number(ownerId)) {
            throw new ForbiddenException('Zugriff verweigert: Sie sind nicht der Besitzer.');
        }

        // KORREKTUR LÖSCHLOGIK:
        // In der DB steht: "/images/room/datei.webp"
        // Wir brauchen für das Filesystem: "uploads/room/datei.webp"
        const relativePath = image.pfad.replace('/images/', 'uploads/');
        const fullPath = path.join(process.cwd(), relativePath);

        try {
            await fs.unlink(fullPath);
            console.log(`Datei erfolgreich gelöscht: ${fullPath}`);
        } catch (err) {
            console.warn(`Datei konnte nicht gelöscht werden (evtl. schon weg): ${fullPath}`);
        }

        return await this.zimmerBildRepo.remove(image);
    }

    async updateRoomImage(id: number, dto: UpdateRoomImageDto, ownerId: number) {
        const image = await this.zimmerBildRepo.findOne({
            where: { zimmer_bild_id: id },
            relations: ['zimmer', 'zimmer.hotel', 'zimmer.hotel.besitzer']
        });

        if (!image) throw new NotFoundException('Raum-Bild nicht gefunden');

        if (Number(image.zimmer.hotel.besitzer?.benutzer_id) !== Number(ownerId)) {
            throw new ForbiddenException('Nicht dein Raum!');
        }

        if (dto.alt !== undefined) image.alt_text = dto.alt;
        
        return await this.zimmerBildRepo.save(image);
    }
}