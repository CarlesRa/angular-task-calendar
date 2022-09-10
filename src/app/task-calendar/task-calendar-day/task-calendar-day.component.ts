import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Moment} from 'moment';
import * as moment from 'moment';
import {MatDialog} from "@angular/material/dialog";
import {Subscription} from "rxjs";
import {TaskCalendarDayDialogComponent} from "../dialogs/task-calendar-day-dialog/task-calendar-day-dialog.component";
import {Work} from "../models/work.model";
import {CalendarMessageService} from "../services/calendar-message.service";

@Component({
  selector: 'app-task-calendar-day',
  templateUrl: './task-calendar-day.component.html',
  styleUrls: ['./task-calendar-day.component.css']
})
export class TaskCalendarDayComponent implements OnInit, OnDestroy {
  @Input() date!: Moment;
  works: Work[] = [];
  isLoading = true;
  isCurrentDay!: boolean;
  subscriptions: Subscription[] = [];
  job!: Work | undefined;

  constructor(
    private detailDialog: MatDialog,
    private calendarMessageService: CalendarMessageService,
  ) {}

  ngOnInit(): void {
    this.isCurrentDay = moment(new Date()).format('LL') === this.date.format('LL');
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
    this.job = this.works.find(work => moment(work.date).format('LL') === this.date.format('LL'));
  }

  openDetail(): void {
    const dialogRef = this.detailDialog.open(TaskCalendarDayDialogComponent, {
      width: '800px',
      height: '800px',
      data: {
        test: this.date.format('LL')
      }
    })
    this.subscriptions.push(
      dialogRef.afterClosed().subscribe(resp => {
        console.log(resp);
      })
    );
  }

}
