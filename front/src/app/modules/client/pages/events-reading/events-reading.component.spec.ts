import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsReadingComponent } from './events-reading.component';

describe('EventsReadingComponent', () => {
  let component: EventsReadingComponent;
  let fixture: ComponentFixture<EventsReadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventsReadingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsReadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
