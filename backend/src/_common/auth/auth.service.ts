import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../users/users.service';
import { LoginResponseDto } from './login-response.dto';
import { Benutzer } from '../../users/user.entity';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}
    async signIn(email: string, pass: string): Promise<LoginResponseDto> {
    const user: Benutzer | null = await this.usersService.findOne(email);

    if (user?.passwordHash !== pass) {
        throw new UnauthorizedException('Ungültige Anmeldedaten');
    }

    // Rolle dynamisch ermitteln
    let role = 'user'; 
    if (user.hotelbesitzer) {
        role = 'hotelbesitzer';
    } else if (user.kunde) {
        role = 'kunde';
    } else if (user.email === 'admin@memorably.de') {
        role = 'admin';
    }
    
    const payload = {
        sub: user.benutzer_id,
        email: user.email,
        role: role,
    };

    return {
        accessToken: await this.jwtService.signAsync(payload),
        user: {
            id: user.benutzer_id,
            email: user.email,
            role: role,
        },
    };
}
}
