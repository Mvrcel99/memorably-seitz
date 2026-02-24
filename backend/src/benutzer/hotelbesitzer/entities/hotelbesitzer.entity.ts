import { Benutzer } from 'src/benutzer/entities/benutzer.entity';
import { Entity, PrimaryGeneratedColumn, Column, Unique, OneToOne, PrimaryColumn, JoinColumn } from 'typeorm';


@Entity('hotelbesitzer')
export class Hotelbesitzer {

    @PrimaryColumn()
    benutzer_id: number; 

    @OneToOne(() => Benutzer, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'benutzer_id' })
    benutzer: Benutzer;
}