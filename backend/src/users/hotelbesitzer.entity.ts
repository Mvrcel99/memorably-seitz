import { Entity, PrimaryGeneratedColumn, Column, Unique, OneToOne, PrimaryColumn, JoinColumn } from 'typeorm';
import { Benutzer } from './user.entity';


@Entity('hotelbesitzer')
export class Hotelbesitzer {

    @PrimaryColumn()
    benutzer_id: number; 

    @OneToOne(() => Benutzer, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'benutzer_id' })
    benutzer: Benutzer;
}