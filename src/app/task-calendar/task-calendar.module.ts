import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {TaskCalendarComponent} from "./task-calendar.component";
import {MatDialogModule} from "@angular/material/dialog";
import {TaskCalendarDayComponent} from './task-calendar-day/task-calendar-day.component';
import {TaskCalendarDayDialogComponent} from './dialogs/task-calendar-day-dialog/task-calendar-day-dialog.component';
import {CalendarMessageService} from "./services/calendar-message.service";



@NgModule({
  declarations: [
    TaskCalendarComponent,
    TaskCalendarDayComponent,
    TaskCalendarDayDialogComponent
  ],
  providers: [
    CalendarMessageService,
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
