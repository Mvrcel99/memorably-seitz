import { Benutzer } from '../../entities/benutzer.entity';
import { Entity, PrimaryGeneratedColumn, Column, Unique, OneToOne, PrimaryColumn, JoinColumn } from 'typeorm';

@Entity('kunde')
export class Kunde {
    @PrimaryColumn() 
    benutzer_id: number;
    
    @OneToOne(() => Benutzer, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'benutzer_id' })
    benutzer: Benutzer;
}