import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserLoginRequest {
  @IsNotEmpty()
  @IsEmail()
  readonly email!: string;

  @IsNotEmpty()
  @IsString()
  readonly password!: string;
}
