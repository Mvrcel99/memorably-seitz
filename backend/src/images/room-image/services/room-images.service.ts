import { ForbiddenException, Injectable, NotFoundException,InternalServerErrorException } from '@nestjs/common';
import { CreateRoomImageDto } from '../dto/create-roomImage.dto';
import { InjectRepository } from '@nestjs/typeorm';
// import { RoomImage } from '../entities/room-image.entity';
// import { Repository } from 'typeorm';
// import { Room } from '../../rooms/entities/room.entity';
import { UpdateRoomImageDto } from '../dto/update-room-image.dto';
import * as fs from 'fs/promises';
import { constants } from 'fs'; 
import * as path from 'path';
@Injectable()
export class RoomImagesService {
    // constructor(
    //     @InjectRepository(RoomImage)
    //     private readonly roomImageRepo: Repository<RoomImage>,
    //     @InjectRepository(Room)
    //     private readonly roomRepo: Repository<Room>,
    // ) {}

    // async createRoomImage(roomId: string, imageUrl:string, dto: CreateRoomImageDto, ownerId:number ){
    //     const lastImage = await this.roomImageRepo.findOne({
    //         where: { roomId },
    //         order: { sort_order: 'DESC' }, 
    //     });
        
        

    //     let finalSortOrder = dto.sortOrder;

    //     if (finalSortOrder !== undefined) {
    //         const existing = await this.roomImageRepo.findOne({
    //             where: { roomId, sort_order: finalSortOrder }
    //         });

    //         if (existing) {
    //             finalSortOrder = lastImage ? lastImage.sort_order + 1 : 0;
    //         }
    //     } else {
    //         finalSortOrder = lastImage ? lastImage.sort_order + 1 : 0;
    //     }
        

    //     const room = await this.roomRepo.findOne({
    //         where: { id: roomId },
    //         relations: ['hotel'], 
    //     });

    //     if (!room) {
    //         throw new NotFoundException(`Raum mit ID ${roomId} wurde nicht gefunden.`);
    //     }

    //     if (room.hotel.ownerId !== ownerId) {
    //         throw new ForbiddenException('Du bist nicht der Besitzer dieses Hotels.');
    //     }

    //     const newImage = this.roomImageRepo.create({
    //         roomId: roomId,
    //         imageUrl: imageUrl,
    //         alt: dto.alt,
    //         sort_order: finalSortOrder,
    //     });
        
    //     return await this.roomImageRepo.save(newImage);

    //    const savedImage = await this.roomImageRepo.save(newImage);

    //     // hier : Wir geben die Nachricht + Daten zurück
    //     return {
    //         message: 'Raumbild wurde erfolgreich hochgeladen und erstellt.',
    //         data: savedImage
    //     };
    // }


    // async updateRoomImage(id: number, dto: UpdateRoomImageDto, ownerId: number) {
    //     const image = await this.roomImageRepo.findOne({
    //         where: { id },
    //         relations: ['room', 'room.hotel'], 
    //     });

    //     if (!image) throw new NotFoundException('Raum-Bild nicht gefunden');

    //     if (Number(image.room.hotel.ownerId) !== Number(ownerId)) {
    //         throw new ForbiddenException('Nicht dein Raum!');
    //     }

    //     if (dto.alt !== undefined) image.alt = dto.alt;
    //     if (dto.sortOrder !== undefined) image.sort_order = dto.sortOrder;

    //     return await this.roomImageRepo.save(image);
    // }

    // async removeRoomImage(id: number, ownerId: number) {
    
    //     const image = await this.roomImageRepo.findOne({
    //         where: { id },
    //         relations: ['room', 'room.hotel']
    //     });

        
    //     if (!image) {
    //         throw new NotFoundException('Raum-Bild wurde in der Datenbank nicht gefunden.');
    //     }

        
    //     if (!image.room || !image.room.hotel) {
    //         throw new InternalServerErrorException('Datenintegritätsfehler: Bild ist keinem Hotel zugeordnet.');
    //     }

    //     if (Number(image.room.hotel.ownerId) !== Number(ownerId)) {
    //         throw new ForbiddenException('Zugriff verweigert: Sie sind nicht der Besitzer dieses Hotels.');
    //     }

        
    //     const filename = image.imageUrl.replace(/^\//, ''); 
    //     const fullPath = path.join(process.cwd(), filename);

        
    //     try {
            
    //         await fs.access(fullPath); 
    //         await fs.unlink(fullPath);
    //         console.log(`Datei erfolgreich gelöscht: ${fullPath}`);
    //     } catch (err) {

    //         console.warn(`Datei konnte nicht im Filesystem gelöscht werden (evtl. schon weg): ${fullPath}`);
    //     }

       
    //     return await this.roomImageRepo.remove(image);
    // }
}