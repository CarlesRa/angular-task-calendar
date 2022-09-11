import {Injectable} from "@angular/core";

@Injectable()
export class CalendarUtilsService {

  addDays(date: Date, days: number): Date {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    return newDate;
  }

  subtractDays(date: Date, days: number): Date {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() - days);
    return newDate;
  }

  addMonths(date: Date, months: number): Date {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() + months);
    return newDate;
  }

  subtractMonths(date: Date, months: number): Date {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() - months);
    return newDate;
  }

  getDaysInMonth(date: Date): number {
    const year = date.getFullYear();
    const month = date.getMonth() + 1 // months are 0-based
    return new Date(year, month, 0).getDate();
  }

  getDateFormatted(date: Date, formatOptions: Intl.DateTimeFormatOptions, locale: string = 'en-EN'): string {
    const event = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const result = event.toLocaleDateString(locale, formatOptions);
    return result;
  }

  isSameDateIgnoringHours(): boolean {

    return true;
  }

}
