import { Controller, Get, UseGuards } from '@nestjs/common';
import { CheckAbilities } from '../../_common/guard/ability.decorator';
import { Action } from '../../_common/casl/action.enum';
import { Buchung } from '../entities/booking.entity';
import { AuthGuard } from '../../_common/auth/auth.guard';
import { AbilitiesGuard } from '../../_common/guard/abilities.guard';
import { CurrentUser } from '../../_common/guard/user.decorator';
import type { AuthenticatedUser } from '../../_common/casl/casl.utils';
import { BookingsService } from '../services/bookings.service';
import { OwnerResponseBookingDto } from '../dto/booking-ownerResponse.dto';

@Controller({
    path: 'owner/bookings',
    version: '1'
})
@UseGuards(AuthGuard, AbilitiesGuard)
export class OwnerBookingsControllerController {
    constructor(private readonly bookingsService: BookingsService) {}

    @Get()
    @CheckAbilities({ action: Action.Read, subject: Buchung })
    async getBookingsforOwner(@CurrentUser() user: AuthenticatedUser): Promise<OwnerResponseBookingDto[]> { 
        return this.bookingsService.getAllBookingsForOwner(user.id);
    }
}