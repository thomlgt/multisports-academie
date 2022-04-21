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

  @Input() registrations: Registration[];
  @Output() deleteRegistrationEvent = new EventEmitter<any>();

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
  }

  deleteRegistration(registration: Registration) {
    this.eventService.cancelRegistration(this.route.snapshot.params['id'], registration).subscribe({
      next: () => {
        this.deleteRegistrationEvent.emit();
      }
    })
  }

}
