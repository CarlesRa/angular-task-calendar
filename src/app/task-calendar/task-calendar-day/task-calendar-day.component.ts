import {Component, Input, OnInit} from '@angular/core';
import {Moment} from 'moment';
import * as moment from 'moment';
import {MatDialog} from "@angular/material/dialog";
import {Subscription} from "rxjs";
import {TaskCalendarDayDialogComponent} from "../dialogs/task-calendar-day-dialog/task-calendar-day-dialog.component";

@Component({
  selector: 'app-task-calendar-day',
  templateUrl: './task-calendar-day.component.html',
  styleUrls: ['./task-calendar-day.component.css']
})
export class TaskCalendarDayComponent implements OnInit {
  @Input() date!: Moment;
  isLoading = true;
  subscription!: Subscription;
  isCurrentDay!: boolean;

  constructor(
    private detailDialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.isCurrentDay = moment(new Date()).format('LL') === this.date.format('LL');
    this.isLoading = false;
  }

  openDetail(): void {
    const dialogRef = this.detailDialog.open(TaskCalendarDayDialogComponent, {
      width: '800px',
      height: '800px',
      data: {
        test: this.date.format('LL')
      }
    })
    this.subscription = dialogRef.afterClosed().subscribe(resp => {
      console.log(resp);
    });
  }

}
