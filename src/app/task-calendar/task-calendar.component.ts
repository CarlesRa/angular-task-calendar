import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import {TOOLBAR_DATE_FORMAT} from "../constants/calendar-constants";
import {Moment} from "moment";

@Component({
  selector: 'app-task-calendar',
  templateUrl: './task-calendar.component.html',
  styleUrls: ['./task-calendar.component.css']
})
export class TaskCalendarComponent implements OnInit {
  isLoading = true;
  dateFormatted!: string;
  dateSelected!: Date;
  calendarDates: Moment[] = [];

  constructor() {
    moment.locale('es');
    this.showCurrentMonth();
  }

  ngOnInit(): void {
    this.isLoading = false;
  }

  showCurrentMonth(): void {
    this.dateSelected = moment(new Date()).toDate();
    this.setDateFormatted(this.dateSelected);
    this.setDayOfDateSelected(this.dateSelected);
  }

  showNextMonth(): void {
    this.dateSelected = moment(this.dateSelected).add(1, 'month').toDate();
    this.setDateFormatted(this.dateSelected);
    this.setDayOfDateSelected(this.dateSelected);
  }

  showPreviousMonth(): void {
    this.dateSelected = moment(this.dateSelected).subtract(1, 'month').toDate();
    this.setDateFormatted(this.dateSelected);
    this.setDayOfDateSelected(this.dateSelected);
  }

  private setDayOfDateSelected(date: Date): void {
    this.dateSelected = moment(date).date(1).toDate();
    this.setCalendarDates();
  }

  private setDateFormatted(date: Date): void {
    this.dateFormatted = moment(date).format(TOOLBAR_DATE_FORMAT);
  }

  private setCalendarDates(): void {
    const daysInMonth = moment(this.dateSelected).daysInMonth();
    let dateHandler = moment(this.dateSelected).toDate();
    this.calendarDates = [];
    for (let i = 0; i < daysInMonth; i++) {
      this.calendarDates.push(moment(dateHandler));
      dateHandler = moment(dateHandler).add(1, 'days').toDate();
    }
  }
}
