import { DateValueObject } from '@/src/Contexts/Shared/Domain/ValueObject/DateValueObject';

export class UserAuthDateAdd extends DateValueObject {
  public constructor(value: Date) {
    super(value);
  }
}
