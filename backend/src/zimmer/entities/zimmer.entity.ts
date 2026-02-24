import { Hotel } from 'src/hotel/entities/hotel.entity';
import { ZimmerBild } from 'src/zimmer-bild/entities/zimmer-bild.entity';
import { Zimmertyp } from 'src/zimmertyp/entities/zimmertyp.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, Unique, Check, JoinColumn } from 'typeorm';

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