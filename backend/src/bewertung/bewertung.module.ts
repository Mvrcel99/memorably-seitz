import { Module } from '@nestjs/common';
import { BewertungService } from './bewertung.service';
import { BewertungController } from './bewertung.controller';

@Module({
  controllers: [BewertungController],
  providers: [BewertungService],
})
export class BewertungModule {}
