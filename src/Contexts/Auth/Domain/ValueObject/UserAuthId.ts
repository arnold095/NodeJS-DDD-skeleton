import { Uuid } from '@/Contexts/Shared/Domain/ValueObject/Uuid';

export class UserAuthId extends Uuid {
    public constructor(value) {
        super(value);
    }
}
