import { Body, Controller, Param, Post, UploadedFile, UseGuards, UseInterceptors, Patch, Delete,ParseIntPipe,Req, BadRequestException
} from '@nestjs/common';
import { AuthGuard } from '../../../_common/auth/auth.guard';
import { AbilitiesGuard } from '../../../_common/guard/abilities.guard';
import { CheckAbilities } from '../../../_common/guard/ability.decorator';
import { Action } from '../../../_common/casl/action.enum';
import { CurrentUser } from '../../../_common/guard/user.decorator';
import type { AuthenticatedUser } from '../../../_common/casl/casl.utils';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from '../../../_common/multer/upload';
import { Hotel } from '../../../hotels/entities/hotel.entity';
import { HotelImagesService } from '../services/hotel-images.service';
import { CreateHotelImageDto } from '../dto/create-hotelImage.dto';
import { UpdateHotelImageDto } from '../dto/update-hotel-image.dto';
import { HotelBild } from '../entities/hotel-image.entity'; 

@Controller({
    path: 'owner/hotels/:hotelId/images', 
    version: '1'
})
@UseGuards(AuthGuard, AbilitiesGuard)
export class OwnerHotelImagesController {

    constructor(private readonly hotelImagesService: HotelImagesService) {}

   
    @Post()
    @CheckAbilities({ action: Action.Create, subject: HotelBild })
    @UseInterceptors(FileInterceptor('image', multerOptions('hotel', 'hotelId')))
    async uploadHotelImage(
        @Param('hotelId') hotelId: string,
        @UploadedFile() file: Express.Multer.File,
        @Body() createHotelImageDto: CreateHotelImageDto,
        @CurrentUser() user: AuthenticatedUser
    ) {
         if (!file) throw new BadRequestException('Kein Bild hochgeladen oder falsches Format');

        const pfad = `/images/${file.filename}`;
        
        
        return this.hotelImagesService.createHotelImage(
            hotelId, 
            pfad, 
            createHotelImageDto, 
            user.id
        );
    }

   
    @Patch(':bildId')
    @CheckAbilities({ action: Action.Update, subject: HotelBild })
    async updateImage(
        @Param('hotelId') hotelId: string,
        @Param('bildId', ParseIntPipe) bildId: number,
        @Body() updateHotelImageDto: UpdateHotelImageDto,
        @CurrentUser() user: AuthenticatedUser
    ) {
        return this.hotelImagesService.updateHotelImage(
            bildId, 
            updateHotelImageDto, 
            user.id
        );
    }

    
    @Delete(':bildId')
    @CheckAbilities({ action: Action.Delete, subject: HotelBild })
    async removeImage(
        @Param('hotelId') hotelId: string,
        @Param('bildId', ParseIntPipe) bildId: number,
        @Req() req: any 
    ) {
        const userId = req.user.id;
        return this.hotelImagesService.removeHotelImage(bildId, userId);
    }
}