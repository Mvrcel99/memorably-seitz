import { Body, Controller, Param, Post, UploadedFile, UseGuards, UseInterceptors, Patch, Delete, ParseIntPipe, BadRequestException } from '@nestjs/common';
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
import { ZimmerBild } from '../entities/room-image.entity'; 
import { UpdateRoomImageDto } from '../dto/update-room-image.dto';

@Controller({
    path: 'owner/rooms/:roomId/images', 
    version: '1'
})
@UseGuards(AuthGuard, AbilitiesGuard)
export class OwnerRoomImagesController {

    constructor(private readonly roomImageService: RoomImagesService) {}

    
    @Post()
    @CheckAbilities({ action: Action.Create, subject: ZimmerBild }) 
    @UseInterceptors(FileInterceptor('image', multerOptions('room', 'roomId')))
    async uploadRoomImage(
        @Param('hotelId') hotelId: number,
        @Param('roomId') roomId: number,
        @UploadedFile() file: Express.Multer.File,
        @Body() createRoomImageDto: CreateRoomImageDto,
        @CurrentUser() user: AuthenticatedUser
    ) {
     
        if (!file) {
        throw new BadRequestException('Datei fehlt! Bitte stelle sicher, dass der Key in Postman "image" heißt und eine Datei ausgewählt ist.');
        }

        const pfad = `/images/${file.filename}`;
        
        
        return this.roomImageService.createRoomImage(
            roomId, 
            hotelId, 
            pfad, 
            createRoomImageDto, 
            user.id
        );
    }

   
    @Patch(':bildId')
    @CheckAbilities({ action: Action.Update, subject: ZimmerBild }) 
    async updateRoomImage(
        @Param('bildId', ParseIntPipe) bildId: number,
        @Body() updateRoomImageDto: UpdateRoomImageDto,
        @CurrentUser() user: AuthenticatedUser
    ) {
        return this.roomImageService.updateRoomImage(bildId, updateRoomImageDto, user.id);
    }

    
    @Delete(':bildId')
    @CheckAbilities({ action: Action.Delete, subject: ZimmerBild }) 
    async removeRoomImage(
        @Param('bildId', ParseIntPipe) bildId: number,
        @CurrentUser() user: AuthenticatedUser
    ) {
        return this.roomImageService.removeRoomImage(bildId, user.id);
    }
}