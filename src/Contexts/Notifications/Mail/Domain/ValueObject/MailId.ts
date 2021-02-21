import { Uuid } from '@/Contexts/Shared/Domain/ValueObject/Uuid';

export class MailId extends Uuid {
    constructor(value) {
        super(value);
    }
}
