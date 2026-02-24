import { Module } from '@nestjs/common';
import { ZimmertypService } from './zimmertyp.service';
import { ZimmertypController } from './zimmertyp.controller';

@Module({
  controllers: [ZimmertypController],
  providers: [ZimmertypService],
})
export class ZimmertypModule {}
