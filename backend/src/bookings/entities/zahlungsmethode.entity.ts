import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

@Entity('zahlungsmethode')
@Unique(['bezeichnung'])
export class Zahlungsmethode {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  bezeichnung: string;
}