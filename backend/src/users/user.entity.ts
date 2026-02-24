import { Entity, PrimaryGeneratedColumn, Column, Unique, OneToOne, PrimaryColumn, JoinColumn } from 'typeorm';
import { Kunde } from './kunde.entity';
import { Hotelbesitzer } from './hotelbesitzer.entity';

@Entity('benutzer')
@Unique(['email'])
export class Benutzer {
  @PrimaryGeneratedColumn({ name: 'benutzer_id' })
  benutzer_id: number;

  @Column()
  email: string;

  @Column()
  vorname: string;

  @Column()
  nachname: string;

  @Column()
  land: string;

  @Column()
  strasse: string;

  @Column()
  plz: string;

  @Column()
  ort: string;

  @Column({ name: 'password_hash', select: false }) 
  passwordHash: string;

  // Spezialisierungen
  @OneToOne(() => Kunde, (kunde) => kunde.benutzer)
  kunde: Kunde;

  @OneToOne(() => Hotelbesitzer, (besitzer) => besitzer.benutzer)
  hotelbesitzer: Hotelbesitzer;
}

