export class BaseError implements Error {
  public name!: string;
  constructor(public code: number, public message: string) {}
}
