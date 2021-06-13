export interface Logger {
  log(message: string, ...obj): void;

  info(message: string, ...obj): void;

  error(message: string, ...obj): void;

  warn(message: string, ...obj): void;

  debug(message: string, ...obj): void;
}
