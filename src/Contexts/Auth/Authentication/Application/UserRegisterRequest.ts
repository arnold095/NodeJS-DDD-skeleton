import { IsEmail, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class UserRegisterRequest {
  @IsNotEmpty()
  @IsUUID()
  readonly id!: string;

  @IsNotEmpty()
  @IsString()
  readonly firstName!: string;

  @IsNotEmpty()
  @IsString()
  readonly lastName!: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email!: string;

  @IsNotEmpty()
  @IsString()
  readonly password!: string;
}
