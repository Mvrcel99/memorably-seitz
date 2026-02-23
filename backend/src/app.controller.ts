import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { DataSource } from 'typeorm';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly dataSource: DataSource
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('health')
  async health() {
    const r = await this.dataSource.query('SELECT 1 as ok');
    return { ok: true, db: r[0]?.ok ?? null };
  }
}
