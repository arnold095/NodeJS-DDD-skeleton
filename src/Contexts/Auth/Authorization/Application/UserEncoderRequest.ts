export class UserEncoderRequest {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly lastName: string,
    readonly email: string
  ) {}
}
