import { Body, Controller, Param, Post, UploadedFile, UseGuards, UseInterceptors,Patch,Delete } from '@nestjs/common';
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
// import { Room } from '../../rooms/entities/room.entity';
// import { UpdateRoomImageDto } from '../dto/update-room-image.dto';
// import { RoomImage } from '../entities/room-image.entity';

@Controller({
    path: '/owner/rooms',
    version: '1'
})
@UseGuards(AuthGuard, AbilitiesGuard)
export class OwnerRoomImagesController {

    constructor(private readonly roomImageSercive: RoomImagesService){}

    // // /owner/rooms/:roomId/images
    // @Post(':roomId/images')
    // @CheckAbilities({ action: Action.Create, subject: RoomImage }) 
    // @UseInterceptors(FileInterceptor('image', multerOptions('room', 'roomId')))
    // async createRoom(
    //     @Param('roomId') roomId: string,
    //     @UploadedFile() file: Express.Multer.File,
    //     @Body() createRoomImageDto: CreateRoomImageDto,
    //     @CurrentUser() user : AuthenticatedUser
    //   ) {
    //     const imageUrl = `/uploads/room/${file.filename}`;
    //     return this.roomImageSercive.createRoomImage(roomId, imageUrl, createRoomImageDto, user.id);
    //   }

    // // /owner/rooms/room-images/:id
    // @Patch('room-images/:id')
    // @CheckAbilities({ action: Action.Update, subject: RoomImage }) 
    // async updateRoomImage(
    //     @Param('id') id: string,
    //     @Body() updateRoomImageDto: UpdateRoomImageDto,
    //     @CurrentUser() user: AuthenticatedUser
    // ) {
    //     return this.roomImageSercive.updateRoomImage(+id, updateRoomImageDto, user.id);
    // }

    // // /owner/rooms/room-images/:id
    // @Delete('room-images/:id')
    // @CheckAbilities({ action: Action.Delete, subject: RoomImage }) 
    // async removeRoomImage(
    //     @Param('id') id: number,
    //     @CurrentUser() user: AuthenticatedUser
    // ) {
    //     return this.roomImageSercive.removeRoomImage(id, user.id);
    // }
}
