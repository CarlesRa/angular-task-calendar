import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-task-calendar-day-dialog',
  templateUrl: './task-calendar-day-dialog.component.html',
  styleUrls: ['./task-calendar-day-dialog.component.css']
})
export class TaskCalendarDayDialogComponent implements OnInit {
  testText!: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<TaskCalendarDayDialogComponent>
  ) {
    this.testText = this.data.test;
  }

  ngOnInit(): void {}

  close(): void {
    this.dialogRef.close();
  }

}
