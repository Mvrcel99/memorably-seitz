import { Module } from '@nestjs/common';
import { AusstattungService } from './ausstattung.service';
import { AusstattungController } from './ausstattung.controller';
import { Ausstattung } from './entities/ausstattung.entity';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';

@Module({
  imports: [TypeOrmModule.forFeature([Ausstattung ])],
  controllers: [AusstattungController],
  providers: [AusstattungService],
})
export class AusstattungModule {}
