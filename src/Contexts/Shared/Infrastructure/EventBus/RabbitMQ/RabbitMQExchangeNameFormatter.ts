export class RabbitMQExchangeNameFormatter {
    public static retry(exchangeName: string) {
        return `retry-${exchangeName}`;
    }

    public static deadLetter(exchangeName: string) {
        return `dead_letter-${exchangeName}`;
    }
}
