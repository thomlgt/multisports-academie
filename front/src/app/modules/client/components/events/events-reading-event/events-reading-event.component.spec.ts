import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsReadingEventComponent } from './events-reading-event.component';

describe('EventsReadingEventComponent', () => {
  let component: EventsReadingEventComponent;
  let fixture: ComponentFixture<EventsReadingEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventsReadingEventComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsReadingEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
