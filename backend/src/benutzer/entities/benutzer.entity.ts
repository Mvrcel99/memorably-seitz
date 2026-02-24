import { Entity, PrimaryGeneratedColumn, Column, Unique, OneToOne } from 'typeorm';

@Entity('benutzer')
@Unique(['email'])
export class Benutzer {
  @PrimaryGeneratedColumn()
  benutzer_id: number;

  @Column()
  email: string;

  @Column()
  vorname: string;

  @Column()
  nachname: string;

  @Column()
  land: string;

  @Column()
  strasse: string;

  @Column()
  plz: string;

  @Column()
  ort: string;
}
