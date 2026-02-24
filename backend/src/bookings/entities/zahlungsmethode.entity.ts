import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, OneToOne, JoinColumn, Check, Unique } from 'typeorm';

@Entity('zahlungsmethode')
@Unique(['bezeichnung'])
export class Zahlungsmethode {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  bezeichnung: string;
}
