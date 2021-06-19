import { injectable } from 'inversify';
import { Logger } from '@sharedDomain';

@injectable()
export class ConsoleLogger implements Logger {
  debug(message: string, ...obj: unknown[]): void {
    // eslint-disable-next-line no-console
    console.debug(message, obj);
  }

  error(message: string, ...obj: unknown[]): void {
    console.error(message, obj);
  }

  public info(message: string, ...obj: unknown[]): void {
    console.info(message, obj);
  }

  log(message: string, ...obj: unknown[]): void {
    // eslint-disable-next-line no-console
    console.log(message, obj);
  }

  warn(message: string, ...obj: unknown[]): void {
    // eslint-disable-next-line no-console
    console.warn(message, obj);
  }
}
