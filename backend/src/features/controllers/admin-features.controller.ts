import { Controller, UseGuards,Post,Body, Patch, Param,ParseIntPipe, Delete} from '@nestjs/common';
import { FeaturesService } from '../services/features.service';
import { AbilitiesGuard } from '../../_common/guard/abilities.guard';
import { AuthGuard } from '../../_common/auth/auth.guard';
import { CreateFeatureDto } from '../dto/create-feature.dto';
import { UpdateFeatureDto } from '../dto/update-feature.dto';

@Controller({
  path: 'admin/features',
  version: '1',
})
@UseGuards(AuthGuard, AbilitiesGuard)
export class AdminFeaturesController {
    constructor( private readonly featuresService: FeaturesService) {}


// @Post()

//   async createFeature(@Body() createFeatureDto: CreateFeatureDto) {
//     return this.featuresService.create(createFeatureDto);
//   }
//   @Patch(':id')
//   async updateFeature(
//   @Param('id', ParseIntPipe) id: number, 
//   @Body() updateFeatureDto: UpdateFeatureDto
//   ) {
//   return this.featuresService.update(id, updateFeatureDto);
// }
// @Delete(':id')
// async deleteFeature(@Param('id', ParseIntPipe) id: number) {
//  return await this.featuresService.delete(id) } // AI Ergebnis aus Eintrag 5
}

