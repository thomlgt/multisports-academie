import { Component, OnInit } from '@angular/core';
import { SafeEvent } from 'src/app/models/event/safeEvent';
import { Event } from 'src/app/models/event/event';
import { EventService } from 'src/app/modules/ms-api/event/event.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  event: Event;

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.initEvent();
  }

  initEvent() {
    let tempId = '620ad41ccf00afacd6b8f140';
    this.eventService.findById(tempId).subscribe(data => {
      this.event = data;
    })
  }

}
