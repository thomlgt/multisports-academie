import { Component, OnInit } from '@angular/core';
import { SafeEvent } from 'src/app/models/event/safeEvent';
import { EventService } from 'src/app/modules/ms-api/event/event.service';

@Component({
  selector: 'app-events-reading',
  templateUrl: './events-reading.component.html',
  styleUrls: ['./events-reading.component.css']
})
export class EventsReadingComponent implements OnInit {

  events: SafeEvent[];

  constructor(private eventService: EventService) { 
  }

  ngOnInit(): void {
    this.initEvents();
  }
  
  initEvents() {
    this.eventService.findAll().subscribe(data => {
      this.events = data;
    })
  }

}
