import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  OneToMany, 
  OneToOne, 
  JoinColumn, 
  Check, 
  ManyToOne, 
  CreateDateColumn 
} from 'typeorm';
import { BuchungZimmer } from './booking-room.entity';
import { Bewertung } from '../../bewertung/entities/bewertung.entity';
import { Zahlungsmethode } from './zahlungsmethode.entity';
import { Kunde } from '../../users/kunde.entity';

@Entity('buchung')
// SQL-Checks direkt auf Datenbankebene für die Datenintegrität
@Check(`"checkout" > "checkin"`)
@Check(`"stornodatum" IS NULL OR "stornodatum" >= "buchungsdatum"`)
export class Buchung {
  @PrimaryGeneratedColumn()
  buchungs_id: number;

  // Die Verknüpfung zum Kunden
  @ManyToOne(() => Kunde, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'kunde_id' })
  kunde: Kunde;

  @Column({ name: 'kunde_id' })
  kunde_id: number;

  // Setzt das Buchungsdatum automatisch beim ersten Speichern
  @CreateDateColumn({ type: 'date', name: 'buchungsdatum' })
  buchungsdatum: Date;

  @Column({ type: 'date' })
  checkin: Date;

  @Column({ type: 'date' })
  checkout: Date;

  @Column({ type: 'date', nullable: true })
  stornodatum: Date;

  @Column()
  anzahl_gaeste: number;

  // Der Transformer sorgt dafür, dass aus dem DB-String direkt eine JS-Zahl wird
  @Column('decimal', { 
    precision: 10, 
    scale: 2,
    transformer: { 
      to: (v: number) => v, 
      from: (v: string) => parseFloat(v) 
    } 
  })
  preis_pro_nacht: number;

  @ManyToOne(() => Zahlungsmethode, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'zahlungsmethode_id' })
  zahlungsmethode: Zahlungsmethode;

  @Column({ name: 'zahlungsmethode_id' })
  zahlungsmethode_id: number;

  @Column({ type: 'date' })
  zahlungsdatum: Date;

  // Relation zu den gebuchten Zimmern (Wichtig für getOne mit relations)
  @OneToMany(() => BuchungZimmer, (bz) => bz.buchung)
  buchungZimmer: BuchungZimmer[];

  @OneToOne(() => Bewertung, (bewertung) => bewertung.buchung)
  bewertung: Bewertung;
}