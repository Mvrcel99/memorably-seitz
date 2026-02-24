import { Buchung } from '../../bookings/entities/booking.entity';
import { Entity, Column, OneToOne, JoinColumn, Check, PrimaryColumn } from 'typeorm';

@Entity('bewertung')
@Check(`"sterne" BETWEEN 1 AND 5`)
export class Bewertung {
  
  @PrimaryColumn()
  buchungs_id: number;

  @OneToOne(() => Buchung, (buchung) => buchung.bewertung, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'buchungs_id' })
  buchung: Buchung;

  @Column()
  titel: string;

  @Column('text')
  text: string;

  @Column()
  sterne: number;
}