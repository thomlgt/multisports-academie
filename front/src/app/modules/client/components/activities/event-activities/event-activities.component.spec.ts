import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventActivitiesComponent } from './event-activities.component';

describe('EventActivitiesComponent', () => {
  let component: EventActivitiesComponent;
  let fixture: ComponentFixture<EventActivitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventActivitiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
