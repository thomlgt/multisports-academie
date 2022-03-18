import { Component, OnInit } from '@angular/core';
import { SafeEvent } from 'src/app/models/event/safeEvent';
import { EventService } from 'src/app/modules/ms-api/event/event.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

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
