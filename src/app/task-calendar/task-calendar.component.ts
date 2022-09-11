import {Component, Input, OnInit} from '@angular/core';
import * as moment from 'moment';
import {TOOLBAR_DATE_FORMAT} from "./constants/calendar-constants";
/*import {Moment} from "moment";*/
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
  @Input() dateLocale: CalendarLocale = 'es';
  @Input() works: Work[] = [];
  isLoading = true;
  dateFormatted!: string;
  dateSelected!: Date;
  /*calendarDates: Moment[] = [];*/
  calendarDates: Date[] = [];

  constructor(
    private calendarMessageService: CalendarMessageService,
    private calendarUtilsService: CalendarUtilsService,
  ) {
    this.works = this.getDataToTestCalendar();
  }

  ngOnInit(): void {
    moment.locale(this.dateLocale);
    this.calendarMessageService.works$ = new BehaviorSubject<Work[]>(this.works);
    this.showCurrentMonth();
    this.isLoading = false;
  }

  getDataToTestCalendar(): Work[] {
    const work1 = new Work();
    /*work1.date = moment(work1.date).add(5, 'days').toDate();*/
    work1.date = this.calendarUtilsService.addDays(work1.date, 5);
    work1.tasks = [
      new Task('Hacer la colada', ''),
      new Task('Vaciar papeleras', '')
    ];
    const work2 = new Work();
    const work3 = new Work();
    /*work3.date = moment(work1.date).add(1, 'months').toDate();*/
    work3.date = this.calendarUtilsService.addMonths(work1.date, 1);
    work3.tasks = [
      new Task('Hacer la colada', ''),
      new Task('Vaciar papeleras', '')
    ];
    return [ work1, work2, work3];
  }

  showCurrentMonth(): void {
    /*this.dateSelected = moment(new Date()).toDate();*/
    this.dateSelected = new Date();
    this.setDateFormatted(this.dateSelected);
    this.setDayOfDateSelected(this.dateSelected);
  }

  showNextMonth(): void {
    /*this.dateSelected = moment(this.dateSelected).add(1, 'month').toDate();*/
    this.dateSelected = this.calendarUtilsService.addMonths(this.dateSelected, 1);
    this.setDateFormatted(this.dateSelected);
    this.setDayOfDateSelected(this.dateSelected);
  }

  showPreviousMonth(): void {
    /*this.dateSelected = moment(this.dateSelected).subtract(1, 'month').toDate();*/
    this.dateSelected = this.calendarUtilsService.subtractMonths(this.dateSelected, 1);
    this.setDateFormatted(this.dateSelected);
    this.setDayOfDateSelected(this.dateSelected);
  }

  private setDayOfDateSelected(date: Date): void {
    /*this.dateSelected = moment(date).date(1).toDate();*/
    this.dateSelected.setDate(1);
    this.setCalendarDates();
  }

  private setDateFormatted(date: Date): void {
    /*this.dateFormatted = moment(date).format(TOOLBAR_DATE_FORMAT);*/
    const dateOptions = { year: 'numeric', month: 'long', } as const;
    this.dateFormatted = this.calendarUtilsService.getDateFormatted(date, dateOptions, 'es-Es');
  }

  private setCalendarDates(): void {
    /*const daysInMonth = moment(this.dateSelected).daysInMonth();
    let dateHandler = moment(this.dateSelected).toDate();*/
    const daysInMonth = this.calendarUtilsService.getDaysInMonth(this.dateSelected);
    let dateHandler = new Date(this.dateSelected);
    this.calendarDates = [];
    for (let i = 0; i < daysInMonth; i++) {
      /*this.calendarDates.push(moment(dateHandler));*/
      /*dateHandler = moment(dateHandler).add(1, 'days').toDate();*/
      this.calendarDates.push(dateHandler);
      dateHandler = this.calendarUtilsService.addDays(dateHandler, 1);
    }
  }
}
