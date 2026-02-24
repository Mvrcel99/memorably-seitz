import { Entity, Column, ManyToOne, JoinColumn, Check, PrimaryColumn } from 'typeorm';
import { Buchung } from './booking.entity';
import { Zimmer } from '../../rooms/entities/room.entity';


@Entity('buchung_zimmer')
@Check(`"anzahl_gaeste" > 0`)
@Check(`"preis_pro_nacht" >= 0`)
export class BuchungZimmer {

  @PrimaryColumn()
  buchungs_id: number;

  @PrimaryColumn()
  zimmer_id: number;

  @ManyToOne(() => Buchung, (b) => b.buchungZimmer, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'buchungs_id' })
  buchung: Buchung;

  @ManyToOne(() => Zimmer, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'zimmer_id' })
  zimmer: Zimmer;

  @Column()
  anzahl_gaeste: number;

  @Column('decimal', { precision: 10, scale: 2 })
  preis_pro_nacht: number;
}