import { isDomainImplementation } from '../../Domain';
import { Logger } from '../../Domain/Services/Logger';

@isDomainImplementation(Logger)
export class ConsoleLogger implements Logger {
  public info(message: string, metadata?: Record<string, unknown>): void {
    console.info(message, metadata);
  }

  public warn(message: string, metadata?: Record<string, unknown>): void {
    console.warn(message, metadata);
  }

  public error(error: Error, metadata?: Record<string, unknown>): void {
    console.error(error, metadata);
  }
}
