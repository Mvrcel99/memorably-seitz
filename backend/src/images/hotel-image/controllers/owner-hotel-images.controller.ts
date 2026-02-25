import { 
  Body, 
  Controller, 
  Param, 
  Post, 
  UploadedFile, 
  UseGuards, 
  UseInterceptors, 
  Patch, 
  Delete,
  ParseIntPipe,
  Req
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
import { HotelBild } from '../entities/hotel-image.entity'; // Import angepasst

@Controller({
    path: 'owner/hotels/:hotelId/images', // Einheitlicher Pfad wie bei den Rooms
    version: '1'
})
@UseGuards(AuthGuard, AbilitiesGuard)
export class OwnerHotelImagesController {

    constructor(private readonly hotelImagesService: HotelImagesService) {}

    /**
     * BILD HOCHLADEN
     */
    @Post()
    @CheckAbilities({ action: Action.Create, subject: HotelBild })
    @UseInterceptors(FileInterceptor('image', multerOptions('hotel', 'hotelId')))
    async uploadHotelImage(
        @Param('hotelId') hotelId: string,
        @UploadedFile() file: Express.Multer.File,
        @Body() createHotelImageDto: CreateHotelImageDto,
        @CurrentUser() user: AuthenticatedUser
    ) {
        // Pfad-Konvention angepasst an deine DB: /images/...
        const pfad = `/images/${file.filename}`;
        
        // Wir übergeben hotelId, den Pfad, das DTO (für alt_text) und die User-ID für den Owner-Check
        return this.hotelImagesService.createHotelImage(
            hotelId, 
            pfad, 
            createHotelImageDto, 
            user.id
        );
    }

    /**
     * BILD-DATEN AKTUALISIEREN (z.B. alt_text)
     */
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

    /**
     * BILD LÖSCHEN
     */
    @Delete(':bildId')
    @CheckAbilities({ action: Action.Delete, subject: HotelBild })
    async removeImage(
        @Param('hotelId') hotelId: string,
        @Param('bildId', ParseIntPipe) bildId: number,
        @Req() req: any // Falls CurrentUser hakt, nehmen wir req.user.id wie bei Rooms
    ) {
        const userId = req.user.id;
        return this.hotelImagesService.removeHotelImage(bildId, userId);
    }
}