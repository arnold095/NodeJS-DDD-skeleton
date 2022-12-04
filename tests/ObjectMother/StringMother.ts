import { faker } from '@faker-js/faker/locale/en';

interface Props {
  length?: number;
  uppercase?: boolean;
  lowercase?: boolean;
}

export class StringMother {
  public static random(options?: Props): string {
    const { length, lowercase, uppercase } = options || {};

    const randomString = faker.datatype.string(length).replace(/[^a-zA-Z]/g, '');
    const randomStringLength = randomString.length;
    let completeLength = '';
    if (length && randomStringLength <= length) {
      completeLength = 'c'.repeat(length - randomStringLength);
    }

    if (lowercase) {
      return randomString.toLowerCase();
    }

    if (uppercase) {
      return randomString.toUpperCase();
    }

    return randomString + completeLength;
  }
}
