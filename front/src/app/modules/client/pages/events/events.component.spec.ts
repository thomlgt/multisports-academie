import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsComponent } from './events.component';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Event } from 'src/app/models/event/event';
import { Registration } from 'src/app/models/event/registration';


describe('EventsComponent', () => {
  let component: EventsComponent;
  let fixture: ComponentFixture<EventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventsComponent ],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsComponent);
    component = fixture.componentInstance;
    component.initEvents();
    fixture.detectChanges();    

  });

  /** fake Data */ 
  // Event
  let testListEvents = [
    new Event(), 
    new Event()
  ];

  it('should should be truthy', () => {
    expect(component).toBeTruthy();
  });

  // TODO : pas nécessaire
  it('should create', async () => {
    await console.log(component.events);
  });

});