import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SafeEvent } from 'src/app/models/event/safeEvent';

@Component({
  selector: 'app-events-reading-event',
  templateUrl: './events-reading-event.component.html',
  styleUrls: ['./events-reading-event.component.scss']
})
export class EventsReadingEventComponent implements OnInit {

  @Input() event : SafeEvent;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  goToEvent() {
    this.router.navigateByUrl(`/event/${this.event._id}`);
  }

}
