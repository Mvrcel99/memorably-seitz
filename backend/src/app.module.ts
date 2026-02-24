import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BewertungModule } from './bewertung/bewertung.module';
import { BuchungZimmerModule } from './buchung-zimmer/buchung-zimmer.module';
import { BuchungModule } from './buchung/buchung.module';
import { ZahlungsmethodeModule } from './zahlungsmethode/zahlungsmethode.module';
import { ZimmerBildModule } from './zimmer-bild/zimmer-bild.module';
import { ZimmerModule } from './zimmer/zimmer.module';
import { ZimmertypModule } from './zimmertyp/zimmertyp.module';
import { HotelAusstattungModule } from './hotel-ausstattung/hotel-ausstattung.module';
import { AusstattungModule } from './ausstattung/ausstattung.module';
import { HotelBildModule } from './hotel-bild/hotel-bild.module';
import { HotelModule } from './hotel/hotel.module';
import { HotelbesitzerModule } from './benutzer/hotelbesitzer/hotelbesitzer.module';
import { KundeModule } from './benutzer/kunde/kunde.module';
import { BenutzerModule } from './benutzer/benutzer.module';



@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      synchronize: false,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
    HotelModule,
    BenutzerModule,
    KundeModule,
    HotelbesitzerModule,
    HotelBildModule,
    AusstattungModule,
    HotelAusstattungModule,
    ZimmertypModule,
    ZimmerModule,
    ZimmerBildModule,
    ZahlungsmethodeModule,
    BuchungModule,
    BuchungZimmerModule,
    BewertungModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
