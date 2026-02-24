import { Zimmer } from 'src/zimmer/entities/zimmer.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, Unique, Check, JoinColumn } from 'typeorm';

@Entity('zimmer_bild')
export class ZimmerBild {
  @PrimaryGeneratedColumn()
  zimmer_bild_id: number;

  @ManyToOne(() => Zimmer, (zimmer) => zimmer.bilder, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'zimmer_id' })
  zimmer: Zimmer;
  
  @Column()
  pfad: string;

  @Column()
  alt_text: string;
}