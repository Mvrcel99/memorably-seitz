import { Controller, Get } from '@nestjs/common';
import { FeaturesService } from '../services/features.service';

@Controller({
  path: 'ausstattung', 
  version: '1',
})
export class FeaturesController {
  constructor(private readonly ausstattungService: FeaturesService) {}

  @Get()
  async getFeatures() {
    
    return this.ausstattungService.findAll();
  }
}