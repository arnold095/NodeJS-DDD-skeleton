import { Logger } from '@sharedDomain';

export class ConsoleLogger implements Logger {
  debug(message: string, ...obj: unknown[]): void {
    // eslint-disable-next-line no-console
    console.debug(`[${new Date().toISOString()}] ${message}`, obj);
  }

  error(message: string, ...obj: unknown[]): void {
    console.error(`[${new Date().toISOString()}] ${message}`, obj);
  }

  public info(message: string, ...obj: unknown[]): void {
    console.info(`[${new Date().toISOString()}] ${message}`, obj);
  }

  log(message: string, ...obj: unknown[]): void {
    // eslint-disable-next-line no-console
    console.log(`[${new Date().toISOString()}] ${message}`, obj);
  }

  warn(message: string, ...obj: unknown[]): void {
    // eslint-disable-next-line no-console
    console.warn(`[${new Date().toISOString()}] ${message}`, obj);
  }
}
