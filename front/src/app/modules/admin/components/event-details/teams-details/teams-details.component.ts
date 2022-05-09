import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Registration } from 'src/app/models/event/registration';
import { EventService } from 'src/app/modules/ms-api/event/event.service';

@Component({
  selector: 'ms-teams-details',
  templateUrl: './teams-details.component.html',
  styleUrls: ['./teams-details.component.scss']
})
export class TeamsDetailsComponent implements OnInit {

  idEvent: any;
  @Input() registrations: Registration[];
  @Output() changeRegistrationEvent = new EventEmitter<any>();

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.idEvent = this.route.snapshot.params['id']
  }

  deleteRegistration(registration: Registration) {
    this.eventService.cancelRegistration(this.idEvent, registration).subscribe({
      next: () => {
        this.changeRegistrationEvent.emit();
      }
    })
  }

  validateRegistration(registration: Registration) {
    this.eventService.validateRegistration(this.idEvent, registration).subscribe({
      next: () => {
        this.changeRegistrationEvent.emit();
      }
    })
  }

}
