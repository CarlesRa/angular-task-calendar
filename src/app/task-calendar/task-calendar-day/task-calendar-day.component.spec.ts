import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskCalendarDayComponent } from './task-calendar-day.component';

describe('TaskCalendarDayComponent', () => {
  let component: TaskCalendarDayComponent;
  let fixture: ComponentFixture<TaskCalendarDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskCalendarDayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskCalendarDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
