import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, Unique, Check } from 'typeorm';

@Entity('zimmertyp')
@Unique(['bezeichnung'])
export class Zimmertyp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  bezeichnung: string;
}