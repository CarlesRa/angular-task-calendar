import {Component, Input, OnInit} from '@angular/core';
import {CalendarLocale} from "./types/calendar-locale.type";
import {Work} from "./models/work.model";
import {CalendarMessageService} from "./services/calendar-message.service";
import {BehaviorSubject} from "rxjs";
import {Task} from "./models/task.model";
import {CalendarUtilsService} from "./services/calendar-utils.service";

@Component({
  selector: 'app-task-calendar',
  templateUrl: './task-calendar.component.html',
  styleUrls: ['./task-calendar.component.css']
})
export class TaskCalendarComponent implements OnInit {
  @Input() dateLocale: CalendarLocale = 'es-ES';
  @Input() works: Work[] = [];
  isLoading = true;
  dateFormatted!: string;
  dateSelected!: Date;
  calendarDates: Date[] = [];

  constructor(
    private calendarMessageService: CalendarMessageService,
    private calendarUtilsService: CalendarUtilsService,
  ) {
    this.works = this.getDataToTestCalendar();
  }

  ngOnInit(): void {
    this.calendarMessageService.works$ = new BehaviorSubject<Work[]>(this.works);
    this.showCurrentMonth();
    this.isLoading = false;
  }

  getDataToTestCalendar(): Work[] {
    const work1 = new Work();
    work1.date = this.calendarUtilsService.addDays(work1.date, 5);
    work1.tasks = [
      new Task('Hacer la colada', ''),
      new Task('Vaciar papeleras', '')
    ];
    const work2 = new Work();
    const work3 = new Work();
    work3.date = this.calendarUtilsService.addMonths(work1.date, 1);
    work3.tasks = [
      new Task('Hacer la colada', ''),
      new Task('Vaciar papeleras', '')
    ];
    return [ work1, work2, work3];
  }

  showCurrentMonth(): void {
    this.dateSelected = new Date();
    this.setDateFormatted(this.dateSelected);
    this.setDayOfDateSelected();
  }

  showNextMonth(): void {
    this.dateSelected = this.calendarUtilsService.addMonths(this.dateSelected, 1);
    this.setDateFormatted(this.dateSelected);
    this.setDayOfDateSelected();
  }

  showPreviousMonth(): void {
    this.dateSelected = this.calendarUtilsService.subtractMonths(this.dateSelected, 1);
    this.setDateFormatted(this.dateSelected);
    this.setDayOfDateSelected();
  }

  private setDayOfDateSelected(): void {
    this.dateSelected.setDate(1);
    this.setCalendarDates();
  }

  private setDateFormatted(date: Date): void {
    const dateOptions = { year: 'numeric', month: 'long', } as const;
    this.dateFormatted = this.calendarUtilsService.getDateFormatted(date, dateOptions, this.dateLocale);
  }

  private setCalendarDates(): void {
    const daysInMonth = this.calendarUtilsService.getDaysInMonth(this.dateSelected);
    let dateHandler = new Date(this.dateSelected);
    this.calendarDates = [];
    for (let i = 0; i < daysInMonth; i++) {
      this.calendarDates.push(dateHandler);
      dateHandler = this.calendarUtilsService.addDays(dateHandler, 1);
    }
  }
}
