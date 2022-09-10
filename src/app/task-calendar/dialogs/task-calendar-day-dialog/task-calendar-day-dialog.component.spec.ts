import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskCalendarDayDialogComponent } from './task-calendar-day-dialog.component';

describe('TaskCalendarDayDialogComponent', () => {
  let component: TaskCalendarDayDialogComponent;
  let fixture: ComponentFixture<TaskCalendarDayDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskCalendarDayDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskCalendarDayDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
