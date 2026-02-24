import { Module } from '@nestjs/common';
import { BuchungZimmerService } from './buchung-zimmer.service';
import { BuchungZimmerController } from './buchung-zimmer.controller';

@Module({
  controllers: [BuchungZimmerController],
  providers: [BuchungZimmerService],
})
export class BuchungZimmerModule {}
