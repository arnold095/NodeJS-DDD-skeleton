import { DomainEventSubscriber } from '@sharedDomain';

export class RabbitMQQueueNameFormatter {
  public static format(subscriber: DomainEventSubscriber): string {
    return this.toSnakeCase(subscriber.constructor.name);
  }

  public static formatRetry(subscriber: DomainEventSubscriber): string {
    return `retry.${this.format(subscriber)}`;
  }

  public static formatDeadLetter(subscriber: DomainEventSubscriber): string {
    return `dead_letter.${this.format(subscriber)}`;
  }

  // TODO: Move to Utils class.
  private static toSnakeCase(text: string): string {
    return text.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
  }
}
