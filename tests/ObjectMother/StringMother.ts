import { type Casing } from '@faker-js/faker';
import { faker } from '@faker-js/faker/locale/en';

type Options = {
  length?: number;
  casing?: Casing;
};

export class StringMother {
  public static random(options?: Options): string {
    const { length, casing } = options || {};

    return faker.string.alpha({
      length,
      casing,
    });
  }

  public static color(): string {
    return faker.internet.color();
  }

  public static city(): string {
    return faker.location.city();
  }

  public static country(): string {
    return faker.location.countryCode();
  }

  public static email(): string {
    return faker.internet.email();
  }
}
