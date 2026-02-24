import { Entity, OneToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { Benutzer } from './user.entity';

@Entity('kunde')
export class Kunde {
    @PrimaryColumn() 
    benutzer_id: number;
    
    @OneToOne(() => Benutzer, (benutzer) => benutzer.kunde, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'benutzer_id' })
    benutzer: Benutzer;
}