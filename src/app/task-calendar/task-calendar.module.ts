import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TaskCalendarComponent} from "./task-calendar.component";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import { TaskCalendarDayComponent } from './task-calendar-day/task-calendar-day.component';
import { TaskCalendarDayDialogComponent } from './dialogs/task-calendar-day-dialog/task-calendar-day-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";



@NgModule({
  declarations: [
    TaskCalendarComponent,
    TaskCalendarDayComponent,
    TaskCalendarDayDialogComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
  ],
  exports: [
    TaskCalendarComponent,
  ]
})
export class TaskCalendarModule { }
