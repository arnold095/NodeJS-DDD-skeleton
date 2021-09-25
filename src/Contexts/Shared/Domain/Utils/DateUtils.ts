export class DateUtils {
  static now(): Date {
    const date = new Date().toISOString();
    return new Date(date);
  }

  static toISOString(date: Date): Date {
    const utcDate = new Date(date).toISOString();
    return new Date(utcDate);
  }

  static isGreaterThan(firstDate: Date, secondDate: Date): boolean {
    return new Date(firstDate) > new Date(secondDate);
  }
}
