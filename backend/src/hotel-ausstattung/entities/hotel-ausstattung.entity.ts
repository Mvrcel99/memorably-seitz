import { Entity, PrimaryColumn, ManyToOne, JoinColumn, Index } from 'typeorm';
import { Hotel } from '../../hotel/entities/hotel.entity';
import { Ausstattung } from '../../ausstattung/entities/ausstattung.entity';

@Entity('hotel_ausstattung')
// Abbildung des Index aus deinem SQL: ON hotel_ausstattung (hotel_id, ausstattung_id)
@Index('hotel_ausstattung_index_0', ['hotel_id', 'ausstattung_id'])
export class HotelAusstattung {
  
  @PrimaryColumn()
  hotel_id: number;

  @PrimaryColumn()
  ausstattung_id: number;

  @ManyToOne(() => Hotel, (hotel) => hotel.hotelAusstattungen, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'hotel_id' })
  hotel: Hotel;

@ManyToOne(() => Ausstattung, (ausstattung) => ausstattung.hotelAusstattungen)
@JoinColumn({ name: 'ausstattung_id' })
ausstattung: Ausstattung;
}