import { DateValueObject } from '@/src/Contexts/Shared/Domain/ValueObject/DateValueObject';

export class UserAuthDateUpd extends DateValueObject {
  public constructor(value: Date) {
    super(value);
  }
}
