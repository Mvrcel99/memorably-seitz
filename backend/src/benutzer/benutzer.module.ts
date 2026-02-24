import { Module } from '@nestjs/common';
import { BenutzerService } from './benutzer.service';
import { BenutzerController } from './benutzer.controller';

@Module({
  controllers: [BenutzerController],
  providers: [BenutzerService],
})
export class BenutzerModule {}
