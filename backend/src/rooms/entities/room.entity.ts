
import { Hotel } from '../../hotels/entities/hotel.entity';
import { ZimmerBild } from '../../images/room-image/entities/room-image.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, Unique, Check, JoinColumn } from 'typeorm';

@Entity('zimmertyp')
@Unique(['bezeichnung'])
export class Zimmertyp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  bezeichnung: string;
}

@Entity('zimmer')
@Unique(['hotel', 'zimmernr_hotel'])
@Check(`"max_anzahl" > 0`)
@Check(`"basispreis" >= 0`)
export class Zimmer {
  @PrimaryGeneratedColumn()
  zimmer_id: number;

  @ManyToOne(() => Hotel, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'hotel_id' })
  hotel: Hotel;
  
  @Column()
  zimmernr_hotel: string;

  @Column()
  bezeichnung: string;

  @Column('text')
  beschreibung: string;

  @Column('decimal', { precision: 10, scale: 2 })
  basispreis: number;

  @Column()
  max_anzahl: number;

  @ManyToOne(() => Zimmertyp, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'zimmertyp_id' })
  zimmertyp: Zimmertyp;

  @OneToMany(() => ZimmerBild, (bild) => bild.zimmer)
  bilder: ZimmerBild[];
}

