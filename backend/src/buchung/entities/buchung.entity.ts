import { Kunde } from '../../benutzer/kunde/entities/kunde.entity';
import { Bewertung } from '../../bewertung/entities/bewertung.entity';
import { BuchungZimmer } from '../../buchung-zimmer/entities/buchung-zimmer.entity';
import { Zahlungsmethode } from '../../zahlungsmethode/entities/zahlungsmethode.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, OneToOne, JoinColumn, Check } from 'typeorm';

@Entity('buchung')
@Check(`"checkout" > "checkin"`)
@Check(`"stornodatum" IS NULL OR "stornodatum" >= "buchungsdatum"`)
export class Buchung {
  @PrimaryGeneratedColumn()
  buchungs_id: number;

  @ManyToOne(() => Kunde, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'kunde_id' })
  kunde: Kunde;

  @Column({ type: 'date' })
  buchungsdatum: Date;

  @Column({ type: 'date' })
  checkin: Date;

  @Column({ type: 'date' })
  checkout: Date;

  @Column({ type: 'date', nullable: true })
  stornodatum: Date;

  @Column()
  anzahl_gaeste: number;

  @Column('decimal', { precision: 10, scale: 2 })
  preis_pro_nacht: number;

  @ManyToOne(() => Zahlungsmethode, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'zahlungsmethode_id' })
  zahlungsmethode: Zahlungsmethode;

  @Column({ type: 'date' })
  zahlungsdatum: Date;

    @OneToMany(() => BuchungZimmer, (bz) => bz.buchung)
    buchungZimmer: BuchungZimmer[];

  @OneToOne(() => Bewertung, (bewertung) => bewertung.buchung)
  bewertung: Bewertung;
}
