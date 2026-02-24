import { Module } from '@nestjs/common';
import { FeaturesController } from './controllers/features.controller';
import { FeaturesService } from './services/features.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ausstattung } from './entities/feature.entity';
import { HotelAusstattung } from './entities/feature-hotel.entity'
import { AdminFeaturesController } from './controllers/admin-features.controller';
import { CaslModule } from '../_common/casl/casl.module';

@Module({
  imports: [TypeOrmModule.forFeature([Ausstattung, HotelAusstattung]),CaslModule],
  controllers: [FeaturesController, AdminFeaturesController],
  providers: [FeaturesService]
})
export class FeaturesModule {}
