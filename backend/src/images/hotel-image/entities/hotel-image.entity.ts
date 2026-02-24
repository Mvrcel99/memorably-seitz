import { Hotel } from '../../../hotels/entities/hotel.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, ManyToMany, JoinTable, Check } from 'typeorm';
@Entity('hotel_bild')
export class HotelBild {
  @PrimaryGeneratedColumn()
  hotel_bild_id: number;

  @ManyToOne(() => Hotel, (hotel) => hotel.bilder, { onDelete: 'CASCADE' })
  hotel: Hotel;

  @Column()
  pfad: string;

  @Column()
  alt_text: string;
}