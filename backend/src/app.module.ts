import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

// Controller & Services
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Feature Modules
import { HotelsModule } from './hotels/hotels.module';
import { BookingsModule } from './bookings/bookings.module';
import { RoomsModule } from './rooms/rooms.module';
import { FeaturesModule } from './features/features.module';
import { HotelImageModule } from './images/hotel-image/hotel-image.module';
import { RoomImageModule } from './images/room-image/room-image.module';
import { UsersModule } from './users/users.module';

import { AuthModule } from './_common/auth/auth.module';
import { CaslModule } from './_common/casl/casl.module';

@Module({
  imports: [
    
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      
      synchronize: process.env.NODE_ENV !== 'production',
      entities: [join(__dirname, '**', '*.entity{.ts,.js}')],
    }),

    
    ServeStaticModule.forRoot({
      
      rootPath: join(process.cwd(), 'uploads'),
      
      serveRoot: '/api/v1/images',
      serveStaticOptions: {
        index: false, 
        cacheControl: true, 
        maxAge: 31536000, 
      },
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}