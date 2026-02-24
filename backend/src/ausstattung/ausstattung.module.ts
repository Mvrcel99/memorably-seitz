import { Module } from '@nestjs/common';
import { AusstattungService } from './ausstattung.service';
import { AusstattungController } from './ausstattung.controller';

@Module({
  controllers: [AusstattungController],
  providers: [AusstattungService],
})
export class AusstattungModule {}
