export class UserPayloadDto {
  id: number;
  email: string;
  role: string;
}

export class LoginResponseDto {
  accessToken: string;
  user: UserPayloadDto;
}