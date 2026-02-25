import { Controller, Post, Body, Param, Req, UseGuards, Delete } from '@nestjs/common';
import { RoomsService } from '../../rooms/services/rooms.service';
import { AuthGuard } from '../../_common/auth/auth.guard';


import {CreateRoomDto } from '../dto/create-room.dto'; 
import { Action } from '../../_common/casl/action.enum';
import { CheckAbilities } from '../../_common/guard/ability.decorator';
import { Zimmer } from '../entities/room.entity';
import { CurrentUser } from '../../_common/guard/user.decorator';
import type { AuthenticatedUser } from '../../_common/casl/casl.utils';
import { Patch } from '@nestjs/common'; 
import { UpdateRoomDto } from '../dto/update-room.dto';




@Controller({
  path: 'owner/hotels/:hotelId/rooms',
  version: '1',
})
@UseGuards(AuthGuard)
export class OwnerRoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post()
  
  @CheckAbilities({ action: Action.Create, subject: Zimmer }) 
  async createRoom(
    @Param('hotelId') hotelId: string,
    @Body() createRoomDto: CreateRoomDto,
    @CurrentUser() user: AuthenticatedUser
  ) {
    
    return this.roomsService.createRoom(hotelId, createRoomDto, user.id);
  }

  @Patch(':roomId') 
  @CheckAbilities({ action: Action.Update, subject: Zimmer })
  async updateRoom(
    @Param('hotelId') hotelId: string,
    @Param('roomId') roomId: string,
    @Body() updateRoomDto: UpdateRoomDto,
    @CurrentUser() user: AuthenticatedUser
  ) {
   
    return this.roomsService.updateRoom(roomId, hotelId, updateRoomDto, user.id);
  }

  @Delete(':roomId')
async delete(
  @Param('hotelId') hotelId: string,
  @Param('roomId') roomId: string,
  @Req() req: any 
) {

  const userId = req.user.id; 
  const userRole = req.user.role;

  return this.roomsService.deleteRoom(roomId, userId, userRole);
}
}