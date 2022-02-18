import { Component, Input, OnInit } from '@angular/core';
import { SafeEvent } from 'src/app/models/event/safeEvent';

@Component({
  selector: 'app-events-reading-event',
  templateUrl: './events-reading-event.component.html',
  styleUrls: ['./events-reading-event.component.css']
})
export class EventsReadingEventComponent implements OnInit {

  @Input() event : SafeEvent;

  constructor() { }

  ngOnInit(): void {
  }

}
