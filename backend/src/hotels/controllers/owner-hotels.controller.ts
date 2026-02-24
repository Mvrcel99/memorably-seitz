import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../_common/auth/auth.guard';
import { AbilitiesGuard } from '../../_common/guard/abilities.guard';
import { CheckAbilities } from '../../_common/guard/ability.decorator';
import { HotelsService } from '../../hotels/services/hotels.service';
import { Hotel } from '../entities/hotel.entity';
import { Action } from '../../_common/casl/action.enum';
import { CurrentUser } from '../../_common/guard/user.decorator';
import type { AuthenticatedUser } from '../../_common/casl/casl.utils';
import { UpdateHotelDto } from '../dto/update-hotel.dto';
import { HotelResponseDto } from '../dto/hotel-response.dto';

@Controller({ 
    path: 'owner/hotels', 
    version: '1' 
})
@UseGuards(AuthGuard, AbilitiesGuard)
export class OwnerHotelsController {
    constructor(private readonly hotelService: HotelsService){}

    // // 7	GET	     /owner/hotels
    // @Get()
    // @CheckAbilities({ action: Action.Read, subject: Hotel })
    // getHotelByOwner(@CurrentUser() user: AuthenticatedUser){

    //     return this.hotelService.getHotelsByOwner(user.id);
    // }

    // // 8	PATCH	 /owner/hotels/:id
    // @Patch(':id')
    // @CheckAbilities({ action: Action.Update, subject: Hotel })
    // updateHotelByID(
    //     @Param('id') hotelId: string,
    //     @Body() updateHotelDto: UpdateHotelDto,
    //     @CurrentUser() user: AuthenticatedUser
    // ){
    //     return this.hotelService.updateHotel(user, hotelId, updateHotelDto);
    // }
}
