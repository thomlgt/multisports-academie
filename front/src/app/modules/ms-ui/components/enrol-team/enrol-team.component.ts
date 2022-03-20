import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/auth/authentication.service';
import { Captain } from 'src/app/models/captain/captain';
import { Registration } from 'src/app/models/event/registration';
import { Team } from 'src/app/models/teams/team';
import { EventService } from 'src/app/modules/ms-api/event/event.service';
import { TeamService } from 'src/app/modules/ms-api/team/team.service';
import { Event } from 'src/app/models/event/event';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-enrol-team',
  templateUrl: './enrol-team.component.html',
  styleUrls: ['./enrol-team.component.scss']
})
export class EnrolTeamComponent implements OnInit {

  @Input() id : string;
  @Input() event : Event;
  @Input() captainTeams: Team[]; 
  @Input() availableTeams : any[];
  @Input() hasRecordedTeam: boolean;
  @Output() enrolTeamEvent = new EventEmitter<void>();

  constructor(
    public activeModal: NgbActiveModal,
    private eventService: EventService,
  ) { }

  ngOnInit(): void {
  }

  registerTeam(teamIndex: number) {
    let newRegistration = new Registration();
    newRegistration.team = this.captainTeams[teamIndex];
    newRegistration.validationStatus = "pending";
    this.eventService.addRegistration(this.id, newRegistration).subscribe(
      next => {
        console.log('registration OK !');
        this.clorseModal();
      },
      error => {
        console.log('registration has failed !');
        this.clorseModal();
      }
    );
  }

  unregisterTeam(teamIndex: number) {
    let newRegistration = new Registration();
    newRegistration.team = this.captainTeams[teamIndex];
    newRegistration.validationStatus = "pending";
    this.eventService.cancelRegistration(this.id, newRegistration).subscribe(
      next => {
        console.log('Deletion OK !');
        this.clorseModal();
      },
      error => {
        console.log('Deletion has failed !');
        this.clorseModal();
      }
    );
  }

  clorseModal() {
    this.enrolTeamEvent.emit();    
    this.activeModal.close();
  }

}
