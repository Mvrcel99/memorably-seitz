import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Benutzer } from './user.entity';


@Injectable()
export class UsersService {
    constructor(
            @InjectRepository(Benutzer) 
            private readonly userRepo: Repository<Benutzer>
        ) {}

    async findOne(_email: string): Promise<Benutzer | null> {
        return this.userRepo
            .createQueryBuilder('benutzer')
            .addSelect('benutzer.passwordHash')
            .leftJoinAndSelect('benutzer.kunde', 'kunde')
            .leftJoinAndSelect('benutzer.hotelbesitzer', 'hotelbesitzer')
            .where('benutzer.email = :email', { email: _email })
            .getOne();
    }
}