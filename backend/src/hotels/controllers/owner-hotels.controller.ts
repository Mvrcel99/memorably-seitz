import { Body, Controller, Get, Param, Patch, UseGuards, ParseIntPipe } from '@nestjs/common';
import { AuthGuard } from '../../_common/auth/auth.guard';
import { AbilitiesGuard } from '../../_common/guard/abilities.guard';
import { CheckAbilities } from '../../_common/guard/ability.decorator';
import { HotelsService } from '../../hotels/services/hotels.service';
import { Hotel } from '../../hotels/entities/hotel.entity'; // Pfad prüfen!
import { Action } from '../../_common/casl/action.enum';
import { CurrentUser } from '../../_common/guard/user.decorator';
import type { AuthenticatedUser } from '../../_common/casl/casl.utils';
import { UpdateHotelDto } from '../../hotels/dto/update-hotel.dto'; // Pfad prüfen!
import { HotelResponseDto } from '../../hotels/dto/hotel-response.dto'; // Pfad prüfen!

@Controller({ 
    path: 'owner/hotels', 
    version: '1' 
})
@UseGuards(AuthGuard, AbilitiesGuard)
export class OwnerHotelsController {
    constructor(private readonly hotelService: HotelsService){}

    // 7. GET /api/v1/owner/hotels
    // Liefert alle Hotels, die dem aktuell eingeloggten Owner gehören
    @Get()
    @CheckAbilities({ action: Action.Read, subject: Hotel })
    async getHotelByOwner(@CurrentUser() user: AuthenticatedUser): Promise<HotelResponseDto[]> {
        // user.id kommt aus dem JWT Token via @CurrentUser Decorator
        return this.hotelService.getHotelsByOwner(user.id);
    }

    // 8. PATCH /api/v1/owner/hotels/:id
    // Ermöglicht einem Owner, sein Hotel zu aktualisieren
    @Patch(':id')
    @CheckAbilities({ action: Action.Update, subject: Hotel })
    async updateHotelByID(
        @Param('id', ParseIntPipe) hotelId: number, // ParseIntPipe macht aus dem String direkt eine Zahl
        @Body() updateHotelDto: UpdateHotelDto,
        @CurrentUser() user: AuthenticatedUser
    ): Promise<HotelResponseDto> {
        // Wir übergeben den User mit, damit der Service prüfen kann, ob das Hotel ihm wirklich gehört
        return this.hotelService.updateHotel(user, hotelId, updateHotelDto);
    }
}