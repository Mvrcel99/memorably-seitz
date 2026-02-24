import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

import { AuthLogin } from './auth-login.dto';

@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    // /api/v1/auth/login
    @Post('login')
    signIn(
        @Body() body: AuthLogin) {
        return this.authService.signIn(body.email, body.password);
    }
}



