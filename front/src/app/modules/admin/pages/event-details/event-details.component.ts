import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Event } from 'src/app/models/event/event';
import { EventService } from 'src/app/modules/ms-api/event/event.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit {

  event: Event;

  updateEventForm = this.fb.group({
    name: "",
    description: "",
    activitiesDetails: "",
    startEvent: "",
    endEvent: "",
    startRegistration: "",
    endRegistration: "",
    minMembers: 0,
    maxMembers: 0,
    minAge: 0,
    minFemale: 0,
    price: 0,
    maxTeams: 0,
    mainPicture: this.fb.group({
      _id: "",
      url: "",
      altText: ""
    }),
    place: this.fb.group({
      name: "",
      address: "",
      zipcode: "",
      city: ""
    })
  })

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initEvent();
  }

  initEvent() {
    this.eventService.findById(this.route.snapshot.params['id']).subscribe(data => {
      this.event = data;
      this.updateEventForm.patchValue(this.event);
    })
  }

}
