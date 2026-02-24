import { HotelAusstattung } from '../../hotel-ausstattung/entities/hotel-ausstattung.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, ManyToMany, JoinTable, Check } from 'typeorm';

@Entity('ausstattung')
export class Ausstattung {
  @PrimaryGeneratedColumn()
  ausstattung_id: number;

  @Column()
  titel: string;

  @Column('text')
  beschreibung: string;

@OneToMany(() => HotelAusstattung, (hotelAusstattung) => hotelAusstattung.ausstattung)
hotelAusstattungen: HotelAusstattung[];
}

