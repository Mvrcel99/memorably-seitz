import { Body, Controller, Param, Post, UploadedFile, UseGuards, UseInterceptors, Patch, Delete } from '@nestjs/common';
import { AuthGuard } from '../../../_common/auth/auth.guard';
import { AbilitiesGuard } from '../../../_common/guard/abilities.guard';
import { CheckAbilities } from '../../../_common/guard/ability.decorator';
import { Action } from '../../../_common/casl/action.enum';
import { CurrentUser } from '../../../_common/guard/user.decorator';
import type { AuthenticatedUser } from '../../../_common/casl/casl.utils';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from '../../../_common/multer/upload';
import { HotelImagesService } from '../services/hotel-images.service';
import { CreateHotelImageDto } from '../dto/create-hotelImage.dto';
// import { HotelImage } from '../entities/hotel-image.entity';
import {UpdateHotelImageDto} from '../dto/update-hotel-image.dto';



@Controller({
    path: '/owner/hotel-images',
    version: '1'
})
// @UseGuards(AuthGuard, AbilitiesGuard)
export class OwnerHotelImagesController {

//     constructor(private readonly hotelImagesService : HotelImagesService){}

//      // /owner/hotel-images/:hotelId/images

 
//  @Post(':hotelId/images')
//  @CheckAbilities({ action: Action.Create, subject: HotelImage})
//  @UseInterceptors(FileInterceptor('image', multerOptions('hotel', 'hotelId')))
// async uploadHotelImage(
//      @Param('hotelId') hotelId: string,
//      @UploadedFile() file: Express.Multer.File,
//      @Body() createHotelImageDto: CreateHotelImageDto,
//      @CurrentUser() user : AuthenticatedUser
//   ) {
//     const imageUrl = `/uploads/hotel/${file.filename}`;
//     console.log(user.id + " userid");
//      return this.hotelImagesService.createHotelImage(hotelId, imageUrl, createHotelImageDto, user.id);
//   }
//       // /owner/hotel-images/hotel-images/:id
//     @Patch('hotel-images/:id')
//     @CheckAbilities({ action: Action.Update, subject: HotelImage })
//     async updateImage(
//     @Param('id') id: number,
//     @Body() updateHotelImageDto: UpdateHotelImageDto,
//     @CurrentUser() user: AuthenticatedUser
//       ) {
//     return this.hotelImagesService.updateHotelImage(id, updateHotelImageDto, String(user.id));
//     }
//     // /owner/hotel-images/hotel-images/:id
//   @Delete('hotel-images/:id')
//   @CheckAbilities({ action: Action.Delete, subject: HotelImage })
//   async removeImage(
//     @Param('id') id: number,
//     @CurrentUser() user: AuthenticatedUser
//   ) {
//     return this.hotelImagesService.removeHotelImage(id, String(user.id));
//   }
}
