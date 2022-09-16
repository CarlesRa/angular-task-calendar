import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {Subscription} from "rxjs";
import {TaskCalendarDayDialogComponent} from "../dialogs/task-calendar-day-dialog/task-calendar-day-dialog.component";
import {Work} from "../models/work.model";
import {CalendarMessageService} from "../services/calendar-message.service";
import {CalendarUtilsService} from "../services/calendar-utils.service";

@Component({
  selector: 'app-task-calendar-day',
  templateUrl: './task-calendar-day.component.html',
  styleUrls: ['./task-calendar-day.component.css']
})
export class TaskCalendarDayComponent implements OnInit, OnDestroy {
  @Input() date!: Date;
  works: Work[] = [];
  subscriptions: Subscription[] = [];
  dateFormat: Intl.DateTimeFormatOptions = {  weekday: 'long', day: 'numeric' } as const;
  dateFormatted!: string;
  isLoading = true;
  isCurrentDay!: boolean;
  job!: Work | undefined;

  constructor(
    private detailDialog: MatDialog,
    private calendarMessageService: CalendarMessageService,
    private calendarUtilsService: CalendarUtilsService,
  ) {}

  ngOnInit(): void {
    this.isCurrentDay = this.calendarUtilsService.isSameDateIgnoringHours(new Date(), this.date);
    this.dateFormatted = this.calendarUtilsService.getDateFormatted(this.date,  this.dateFormat, 'es-ES');
    this.initSubscriptions();
    this.isLoading = false;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  private initSubscriptions(): void {
    this.subscriptions.push(
      this.calendarMessageService.works$.subscribe(works => {
        this.works = works;
        this.setJob();
      })
    );
  }

  private setJob(): void {
    this.job = this.works.find(work => this.calendarUtilsService.isSameDateIgnoringHours(work.date, this.date));
  }

  openDetail(): void {
    const dialogRef = this.detailDialog.open(TaskCalendarDayDialogComponent, {
      width: '800px',
      height: '800px',
      data: {
        test: this.dateFormatted
      }
    })
    this.subscriptions.push(
      dialogRef.afterClosed().subscribe(resp => {
        console.log(resp);
      })
    );
  }

}
