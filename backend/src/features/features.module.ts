import { Module } from '@nestjs/common';
import { FeaturesController } from './controllers/features.controller';
import { FeaturesService } from './services/features.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ausstattung } from './entities/feature.entity';
import { HotelAusstattung } from './entities/feature-hotel.entity';
import { AdminAusstattungController } from './controllers/admin-features.controller'; // Prüfe den Klassennamen
import { CaslModule } from '../_common/casl/casl.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ausstattung, HotelAusstattung]), 
    CaslModule
  ],
  controllers: [
    FeaturesController, 
    AdminAusstattungController
  ],
  providers: [FeaturesService],
  exports: [FeaturesService] // WICHTIG: Exportieren, falls andere Module darauf zugreifen
})
export class FeaturesModule {}