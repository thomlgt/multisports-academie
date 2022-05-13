import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/modules/ms-api/event/event.service';
import { Event } from 'src/app/models/event/event';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  events: Event[];

  constructor(private eventService: EventService) { 
  }

  ngOnInit(): void {
    this.initEvents();
  }
  
  initEvents() {
    this.eventService.findAll().subscribe(data => {
      this.events = data;
      console.log(data[0]);
      console.log(data[0] instanceof Event);
      console.log(data[0].constructor.name);
      console.log(Event.name);
    })
  }

}
