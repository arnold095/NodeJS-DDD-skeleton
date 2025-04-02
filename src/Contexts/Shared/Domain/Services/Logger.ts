export abstract class Logger {
  public abstract info(message: string, metadata?: Record<string, unknown>): void;

  public abstract warn(message: string, metadata?: Record<string, unknown>): void;

  public abstract error(error: Error, metadata?: Record<string, unknown>): void;
}
