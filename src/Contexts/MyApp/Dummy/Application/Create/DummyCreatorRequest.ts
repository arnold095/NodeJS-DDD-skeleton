import { IsEmail, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class DummyCreatorRequest {
  @IsNotEmpty()
  @IsUUID()
  public readonly id!: string;

  @IsNotEmpty()
  @IsString()
  public readonly title!: string;

  @IsNotEmpty()
  @IsString()
  public readonly content!: string;

  @IsNotEmpty()
  @IsEmail()
  public readonly email!: string;
}
