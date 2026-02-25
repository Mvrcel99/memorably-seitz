import { Body, Controller, Param, Post, UploadedFile, UseGuards, UseInterceptors, Patch, Delete, ParseIntPipe } from '@nestjs/common';
import { RoomImagesService } from '../services/room-images.service';
import { AuthGuard } from '../../../_common/auth/auth.guard';
import { AbilitiesGuard } from '../../../_common/guard/abilities.guard';
import { CheckAbilities } from '../../../_common/guard/ability.decorator';
import { Action } from '../../../_common/casl/action.enum';
import { CurrentUser } from '../../../_common/guard/user.decorator';
import type { AuthenticatedUser } from '../../../_common/casl/casl.utils';
import { CreateRoomImageDto } from '../dto/create-roomImage.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from '../../../_common/multer/upload';
import { ZimmerBild } from '../entities/room-image.entity'; // Import auf deine Entity angepasst
import { UpdateRoomImageDto } from '../dto/update-room-image.dto';

@Controller({
    path: 'owner/hotels/:hotelId/rooms/:roomId/images', // Pfad an die Hierarchie angepasst
    version: '1'
})
@UseGuards(AuthGuard, AbilitiesGuard)
export class OwnerRoomImagesController {

    constructor(private readonly roomImageService: RoomImagesService) {}

    /**
     * ZIMMER-BILD HOCHLADEN
     */
    @Post()
    @CheckAbilities({ action: Action.Create, subject: ZimmerBild }) 
    @UseInterceptors(FileInterceptor('image', multerOptions('room', 'roomId')))
    async uploadRoomImage(
        @Param('hotelId', ParseIntPipe) hotelId: number,
        @Param('roomId', ParseIntPipe) roomId: number,
        @UploadedFile() file: Express.Multer.File,
        @Body() createRoomImageDto: CreateRoomImageDto,
        @CurrentUser() user: AuthenticatedUser
    ) {
        // Pfad für die DB generieren
        const pfad = `/images/${file.filename}`;
        
        // hotelId wird mitgegeben, um sicherzustellen, dass das Zimmer zum Hotel gehört
        return this.roomImageService.createRoomImage(
            roomId, 
            hotelId, 
            pfad, 
            createRoomImageDto, 
            user.id
        );
    }

    /**
     * ZIMMER-BILD DATEN AKTUALISIEREN
     */
    @Patch(':bildId')
    @CheckAbilities({ action: Action.Update, subject: ZimmerBild }) 
    async updateRoomImage(
        @Param('bildId', ParseIntPipe) bildId: number,
        @Body() updateRoomImageDto: UpdateRoomImageDto,
        @CurrentUser() user: AuthenticatedUser
    ) {
        return this.roomImageService.updateRoomImage(bildId, updateRoomImageDto, user.id);
    }

    /**
     * ZIMMER-BILD LÖSCHEN
     */
    @Delete(':bildId')
    @CheckAbilities({ action: Action.Delete, subject: ZimmerBild }) 
    async removeRoomImage(
        @Param('bildId', ParseIntPipe) bildId: number,
        @CurrentUser() user: AuthenticatedUser
    ) {
        return this.roomImageService.removeRoomImage(bildId, user.id);
    }
}