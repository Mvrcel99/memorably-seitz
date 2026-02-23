import { 
  Body, 
  Controller, 
  Delete, 
  Get, 
  Param, 
  Patch, 
  Post, 
  Query, 
  ParseIntPipe 
} from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // generische CRUD-Endpunkte für alle registrierten Tabellen. Die Tabelle wird als URL-Parameter übergeben, die Daten als JSON im Body.
  // Tabellen: Benutzer, Kunde, Hotelbesitzer, Ausstattung, Zimmertyp, Zahlungsmethode, Hotel_Ausstattung, buchung_zimmer
  @Get(':table')
  async findAll(
    @Param('table') table: string,
    @Query('limit', new ParseIntPipe({ optional: true })) limit?: number,
    @Query('offset', new ParseIntPipe({ optional: true })) offset?: number,
  ) {
    return this.adminService.findAll(table, limit, offset);
  }

  @Post(':table')
  async create(
    @Param('table') table: string, 
    @Body() data: Record<string, any>
  ) {
    return this.adminService.create(table, data);
  }

  @Patch(':table')
  async update(
    @Param('table') table: string,
    @Body() body: { keys: Record<string, any>; data: Record<string, any> },
  ) {
    return this.adminService.update(table, body.keys, body.data);
  }

  @Delete(':table')
  async remove(
    @Param('table') table: string,
    @Body() body: { keys: Record<string, any> },
  ) {
    return this.adminService.remove(table, body.keys);
  }
}