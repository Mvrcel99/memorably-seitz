import { Module } from '@nestjs/common';
import { KundeService } from './kunde.service';
import { KundeController } from './kunde.controller';

@Module({
  controllers: [KundeController],
  providers: [KundeService],
})
export class KundeModule {}
