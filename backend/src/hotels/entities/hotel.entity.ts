import { Hotelbesitzer } from '../../users/hotelbesitzer.entity';
import { HotelAusstattung } from '../../features/entities/feature-hotel.entity';
import { HotelBild } from '../../images/hotel-image/entities/hotel-image.entity';
import { Zimmer } from '../../rooms/entities/room.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn, Check } from 'typeorm';

@Entity('hotel')
@Check(`"hotelsterne" BETWEEN 1 AND 5`)
@Check(`"stornogebuehr_prozent" BETWEEN 0 AND 100`)
@Check(`"kostenlos_stornierbar_bis_stunden" >= 0`)
export class Hotel {
  @PrimaryGeneratedColumn()
  hotel_id: number;

  @ManyToOne(() => Hotelbesitzer, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'besitzer_id' })
  besitzer: Hotelbesitzer;

  @Column({ name: 'besitzer_id' }) 
  besitzer_id: number;

  @Column()
  name: string;

  @Column({ nullable: true }) 
  slug: string;

  @Column({ default: 'active' })
  status: string;

  @Column('text')
  beschreibung: string;

  @Column()
  hotelsterne: number;

  @Column()
  land: string;

  @Column()
  strasse: string;

  @Column()
  plz: string;

  @Column()
  ort: string;

  @Column('decimal', { precision: 10, scale: 8, nullable: true })
  latitude: number;

  @Column('decimal', { precision: 11, scale: 8, nullable: true })
  longitude: number;

  @Column({ default: 0 })
  stornogebuehr_prozent: number;

  @Column({ default: 24 })
  kostenlos_stornierbar_bis_stunden: number;

  @OneToMany(() => HotelBild, (bild) => bild.hotel)
  bilder: HotelBild[];

  @OneToMany(() => HotelAusstattung, (ha) => ha.hotel)
  hotelAusstattungen: HotelAusstattung[];

  @OneToMany(() => Zimmer, (zimmer) => zimmer.hotel)
  zimmer: Zimmer[];
}