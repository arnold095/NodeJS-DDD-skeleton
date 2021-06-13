import { StringValueObject } from '@/src/Contexts/Shared/Domain/ValueObject/StringValueObject';

export class UserAuthEmail extends StringValueObject {
  public constructor(value: string) {
    super(value);
  }
}
