import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { BewertungService } from './bewertung.service';
import { CreateBewertungDto } from './dto/create-bewertung.dto';
import { UpdateBewertungDto } from './dto/update-bewertung.dto';
import { AbilitiesGuard } from '../_common/guard/abilities.guard';
import { CheckAbilities } from '../_common/guard/ability.decorator';
import { CurrentUser } from '../_common/guard/user.decorator';
import { AuthGuard } from '../_common/auth/auth.guard';
import type { AuthenticatedUser } from '../_common/casl/casl.utils';
import { Action } from '../_common/casl/action.enum';
import { Bewertung } from './entities/bewertung.entity';



@Controller({
  path: 'bewertungen',
  version: '1',
})
// @UseGuards(AuthGuard, AbilitiesGuard)
export class BewertungController {
  constructor(private readonly bewertungService: BewertungService) {}

@Post()
create(@Body() dto: CreateBewertungDto) {
  return this.bewertungService.create(dto);
}

  @Get('hotel/:hotelId')
  findByHotel(@Param('hotelId', ParseIntPipe) hotelId: number) {
    return this.bewertungService.findByHotel(hotelId);
  }

  @Get('buchung/:buchungsId')
  findByBuchung(@Param('buchungsId', ParseIntPipe) buchungsId: number) {
    return this.bewertungService.findByBuchung(buchungsId);
  }

  @Patch(':buchungsId')
  @CheckAbilities({ action: Action.Update, subject: Bewertung })
  update(
    @CurrentUser() user: AuthenticatedUser,
    @Param('buchungsId', ParseIntPipe) buchungsId: number,
    @Body() dto: UpdateBewertungDto,
  ) {
    return this.bewertungService.update(user, buchungsId, dto);
  }
 
  @Delete(':buchungsId')
  @CheckAbilities({ action: Action.Delete, subject: Bewertung })
  remove(
    @CurrentUser() user: AuthenticatedUser,
    @Param('buchungsId', ParseIntPipe) buchungsId: number,
  ) {
    return this.bewertungService.remove(user, buchungsId);
  }

}
