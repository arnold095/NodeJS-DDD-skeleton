import { DomainEventSubscriber } from "@/Contexts/Shared/Domain/Bus/Event/DomainEventSubscriber";

export class RabbitMQQueueNameFormatter {
    public static format(subscriber: DomainEventSubscriber): string {
        return this.toSnakeCase(subscriber.constructor.name);
    }

    public static formatRetry(subscriber: DomainEventSubscriber): string {
        return `retry.${this.format(subscriber)}`
    }

    public static formatDeadLetter(subscriber: DomainEventSubscriber) {
        return `dead_letter.${this.format(subscriber)}`
    }

    // TODO: Move to Utils class.
    private static toSnakeCase(text: string) {
        return text.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
    }
}
