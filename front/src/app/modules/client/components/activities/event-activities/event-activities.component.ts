import { Component, Input, OnInit } from '@angular/core';
import { Event } from 'src/app/models/event/event';

@Component({
  selector: 'app-event-activities',
  templateUrl: './event-activities.component.html',
  styleUrls: ['./event-activities.component.scss']
})
export class EventActivitiesComponent implements OnInit {

  @Input() event: Event;

  constructor() { }

  ngOnInit(): void {
  }

}
