import { Uuid } from '@/Contexts/Shared/Domain/ValueObject/Uuid';

export class DummyAddressId extends Uuid {
    public constructor(value) {
        super(value);
    }
}
