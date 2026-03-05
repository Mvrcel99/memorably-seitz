import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HotelsModule } from './hotels/hotels.module';
import { BookingsModule } from './bookings/bookings.module';
import { RoomsModule } from './rooms/rooms.module';
import { FeaturesModule } from './features/features.module';
import { HotelImageModule } from './images/hotel-image/hotel-image.module';
import { RoomImageModule } from './images/room-image/room-image.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './_common/auth/auth.module';
import { CaslModule } from './_common/casl/casl.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      synchronize: true,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
    HotelsModule,
    BookingsModule,
    RoomsModule,
    FeaturesModule,
    HotelImageModule,
    RoomImageModule,
    UsersModule,
    AuthModule,
    CaslModule,
    ServeStaticModule.forRoot({
      
      rootPath: join(process.cwd(), 'uploads'),

      serveRoot: '/images',
     
      serveStaticOptions: {
        index: false,
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}