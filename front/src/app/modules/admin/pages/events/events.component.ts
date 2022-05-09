import { Component, OnInit } from '@angular/core';
import { Event } from 'src/app/models/event/event';
import { EventService } from 'src/app/modules/ms-api/event/event.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  events : Event[] = [];

  constructor(
    private eventService: EventService
  ) { }

  ngOnInit(): void {
    this.initEvents();
  }

  initEvents() {
    this.eventService.findAll().subscribe(data => {
      this.events = data;
    })
  }

}
