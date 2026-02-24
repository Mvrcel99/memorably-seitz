// Login

import { IsEmail, IsString, MinLength } from 'class-validator';

export class AuthLogin {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(1)
  password: string;
}