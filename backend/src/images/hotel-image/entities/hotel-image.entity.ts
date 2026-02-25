import { Hotel } from '../../../hotels/entities/hotel.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, ManyToMany, JoinTable, Check, JoinColumn} from 'typeorm';

@Entity('hotel_bild')
export class HotelBild {
  @PrimaryGeneratedColumn()
  hotel_bild_id: number; 

  @Column()
  pfad: string; 

  @Column()
  alt_text: string; 

  @ManyToOne(() => Hotel, (hotel) => hotel.bilder)
  @JoinColumn({ name: 'hotel_id' }) 
  hotel: Hotel;
}