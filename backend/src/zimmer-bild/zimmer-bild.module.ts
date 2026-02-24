import { Module } from '@nestjs/common';
import { ZimmerBildService } from './zimmer-bild.service';
import { ZimmerBildController } from './zimmer-bild.controller';

@Module({
  controllers: [ZimmerBildController],
  providers: [ZimmerBildService],
})
export class ZimmerBildModule {}
