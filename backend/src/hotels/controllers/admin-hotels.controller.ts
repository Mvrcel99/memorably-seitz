import { Body, Controller, Patch, Post, UseGuards, Param, ParseIntPipe, Get } from '@nestjs/common';
import { AuthGuard } from '../../_common/auth/auth.guard';
import type { AuthenticatedUser } from '../../_common/casl/casl.utils';
import { HotelsService } from '../../hotels/services/hotels.service';
import { Hotel } from '../entities/hotel.entity';
import { Action } from '../../_common/casl/action.enum';
import { AbilitiesGuard } from '../../_common/guard/abilities.guard';
import { CheckAbilities } from '../../_common/guard/ability.decorator';
import { CurrentUser } from '../../_common/guard/user.decorator';
import { CreateHotelDto } from '../dto/create-hotel.dto';
import { UpdateHotelDto } from '../dto/update-hotel.dto';

@Controller({ 
    path: 'admin/hotels', 
    version: '1' 
})
@UseGuards(AuthGuard, AbilitiesGuard)
export class AdminHotelsController {
    constructor(
        private readonly hotelService: HotelsService,
    ) {}
    @Get()
    @CheckAbilities({ action: Action.Read, subject: Hotel })
    async findAllHotels() {
   
        return this.hotelService.searchHotels({}); 
    }

    @Post()
    @CheckAbilities({ action: Action.Create, subject: Hotel })
    async createHotel(
        @CurrentUser() user: AuthenticatedUser,
        @Body() dto: CreateHotelDto
    ) {
        return this.hotelService.createHotel(user, dto);
    }

    @Patch(':id')
    @CheckAbilities({ action: Action.Update, subject: Hotel })
    async updateHotelByAdmin(
        @Param('id', ParseIntPipe) hotelId: number,
        @Body() updateHotelDto: UpdateHotelDto,
        @CurrentUser() user: AuthenticatedUser
    ) {
        return this.hotelService.updateHotel(user, hotelId, updateHotelDto);
    }

    @Patch(':id/status')
    @CheckAbilities({ action: Action.Update, subject: Hotel })
    async setHotelStatus(
        @Param('id', ParseIntPipe) hotelId: number,
        @Body() body: { status: 'active' | 'inactiv' },
        @CurrentUser() user: AuthenticatedUser
    ) {
        return this.hotelService.setHotelStatus(user, hotelId, body.status);
    }


}