import { Controller, Get} from '@nestjs/common';
import { FeaturesService } from '../services/features.service';

@Controller({
  path: 'features',
  version: '1',
})
export class FeaturesController {
    constructor( private readonly featuresService: FeaturesService) {}

  // @Get()
  // getFeatures() {
  //   return this.featuresService.findAll();
  // }

}
