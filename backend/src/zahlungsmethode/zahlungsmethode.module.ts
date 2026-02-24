import { Module } from '@nestjs/common';
import { ZahlungsmethodeService } from './zahlungsmethode.service';
import { ZahlungsmethodeController } from './zahlungsmethode.controller';

@Module({
  controllers: [ZahlungsmethodeController],
  providers: [ZahlungsmethodeService],
})
export class ZahlungsmethodeModule {}
