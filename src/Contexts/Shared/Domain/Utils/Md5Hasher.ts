import { createHmac } from 'crypto';

const SECRET = 'MD5';
export class Md5Hasher {
  public static toMd5(str: string): string {
    const hasher = createHmac('md5', SECRET);
    return hasher.update(str).digest('hex');
  }
}
