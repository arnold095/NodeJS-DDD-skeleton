export interface Logger {
  log(message: string, ...obj: unknown[]): void;

  info(message: string, ...obj: unknown[]): void;

  error(message: string, ...obj: undefined[]): void;

  warn(message: string, ...obj: unknown[]): void;

  debug(message: string, ...obj: unknown[]): void;
}
