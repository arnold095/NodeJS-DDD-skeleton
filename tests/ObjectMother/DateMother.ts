export class DateMother {
  public static recent(days = 1): Date {
    const date = new Date();
    date.setDate(date.getDate() - days);
    return date;
  }

  public static past(years = 1): Date {
    const date = new Date();
    date.setFullYear(date.getFullYear() - years);
    return date;
  }

  public static future(years = 1): Date {
    const date = new Date();
    date.setFullYear(date.getFullYear() + years);
    return date;
  }
}
