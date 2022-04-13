import { Component, Input, OnInit } from '@angular/core';
import { Event } from 'src/app/models/event/event';

@Component({
  selector: 'ms-display-admin-event',
  templateUrl: './display-admin-event.component.html',
  styleUrls: ['./display-admin-event.component.scss']
})
export class DisplayAdminEventComponent implements OnInit {

  @Input() event: Event;

  registrationStatus : string = "";

  constructor() { }

  ngOnInit(): void {
    this.initStatus();
  }

  initStatus() {
    let currentDate = new Date();
    let startRegistration = new Date(this.event.startRegistration);
    let endRegistration = new Date(this.event.endRegistration);
    if(startRegistration < currentDate && currentDate < endRegistration) {
      this.registrationStatus = `Ouvertes`
    } else if(startRegistration > currentDate) {
      this.registrationStatus = `Ouvrent le ${startRegistration.getDate()}/${startRegistration.getMonth()}/${startRegistration.getFullYear()}`
    } else {
      this.registrationStatus = `Terminées`
    }
  }

}
