import { Logger } from '@/src/Contexts/Shared/Domain/Services/Logger';
import { injectable } from 'inversify';

@injectable()
export class ConsoleLogger implements Logger {
  debug(message: string, obj?: unknown): void {
    // eslint-disable-next-line no-console
    console.debug(message, obj);
  }

  error(message: string, obj?: unknown): void {
    console.error(message, obj);
  }

  info(message: string, obj?: unknown): void {
    console.info(message, obj);
  }

  log(message: string, obj?: unknown): void {
    // eslint-disable-next-line no-console
    console.log(message, obj);
  }

  warn(message: string, obj?: unknown): void {
    // eslint-disable-next-line no-console
    console.warn(message, obj);
  }
}
