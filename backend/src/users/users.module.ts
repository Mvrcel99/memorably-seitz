import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Benutzer } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Benutzer])],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
