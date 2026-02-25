import { Controller, Get } from '@nestjs/common';
import { FeaturesService } from '../services/features.service';

@Controller({
  path: 'ausstattung', // Geändert von 'features' auf 'ausstattung'
  version: '1',
})
export class FeaturesController {
  constructor(private readonly ausstattungService: FeaturesService) {}

  @Get()
  async getFeatures() {
    // Gibt alle Einträge aus der Tabelle 'ausstattung' zurück
    return this.ausstattungService.findAll();
  }
}