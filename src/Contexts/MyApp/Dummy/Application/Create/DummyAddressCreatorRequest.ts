import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class DummyAddressCreatorRequest {
  @IsNotEmpty()
  @IsUUID()
  public readonly id!: string;

  @IsNotEmpty()
  @IsUUID()
  public readonly dummyId!: string;

  @IsNotEmpty()
  @IsString()
  public readonly alias!: string;

  @IsNotEmpty()
  @IsString()
  public readonly street!: string;

  @IsNotEmpty()
  @IsString()
  public readonly city!: string;

  @IsNotEmpty()
  @IsString()
  public readonly postalCode!: string;

  @IsNotEmpty()
  @IsString()
  public readonly country!: string;
}
