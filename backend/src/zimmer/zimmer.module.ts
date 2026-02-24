import { Module } from '@nestjs/common';
import { ZimmerService } from './zimmer.service';
import { ZimmerController } from './zimmer.controller';

@Module({
  controllers: [ZimmerController],
  providers: [ZimmerService],
})
export class ZimmerModule {}
