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

  // currentCaptain: Captain|null;

  // eventTeams: Team[];
  // captainTeams: Team[];  
  // availableTeams: any[];
  // hasRecordedTeam: boolean;

  // @Input() captainTeams: Team[]; 
  // @Input() availableTeams : any[];
  // hasRecordedTeam: boolean;

  constructor(
    public activeModal: NgbActiveModal,
    private eventService: EventService,
    // private teamService: TeamService,
    // private route : ActivatedRoute,
    // private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
    // this.hasRecordedTeam = false;
    // this.initEventTeams();
  }

  // initEventTeams() {
  //   let registrations = this.event.registrations;
  //   for (let registration of registrations) {
  //     this.eventTeams.push(registration.team);
  //   }
  //   this.initCaptain(); 
  // }

  // initCaptain() {
  //   this.currentCaptain = this.authenticationService.currentCaptainValue.captain;
  //   this.initCaptainTeams();
  // }

  // initCaptainTeams() {
  //   this.teamService.findByCaptainId(this.currentCaptain._id).subscribe(data => {
  //     this.captainTeams = data;
  //     this.checkAvailableTeams();
  //   })
  // }

  // checkAvailableTeams() {
  //   for (let team of this.captainTeams) {
  //     let information: string;
  //     let registered: boolean;
  //     let suitable: boolean;

  //     // check if registered
  //     if (this.eventTeams.some(eventTeam => eventTeam._id === team._id)) {
  //       registered = true;
  //       this.hasRecordedTeam = true;
  //     } else {
  //       registered = false;
  //     }

  //     // check nb of fitting members
  //     let acceptedMembers = [];
  //     let teamMembers = team.members;
  //     const today = new Date();
  //     for (let member of teamMembers) {
  //       // check age  
  //       let birthDate = new Date(member.birthdate);
  //       let age = today.getFullYear() - birthDate.getFullYear();
  //       let m = today.getMonth() - birthDate.getMonth();
  //       if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
  //           age--;
  //       }
  //       console.log(age);
  //       if (age < this.event.minAge) {
  //         information = `Les participans doivent avoir au moins ${this.event.minAge} ans.`;
  //         suitable = false;
  //         acceptedMembers = [];
  //         break;
  //       } else {
  //         acceptedMembers.push(member);
  //       }
  //     }
  //     console.log(acceptedMembers.length);
  //     if (acceptedMembers.length > 0) {
  //       if (acceptedMembers.length + 1 < this.event.minMembers) {
  //         information = `Il doit y avoir au moins ${this.event.minMembers} membres dans une équipe.`;
  //         suitable = false;
  //       } else if (acceptedMembers.length + 1 > this.event.maxMembers){
  //         information = `Il ne doit pas y avoir plus de ${this.event.maxMembers} membres dans une équipe.`;
  //         suitable = false;
  //       } else {
  //         suitable = true;
  //       }
  //     }

  //     this.availableTeams.push(
  //       {
  //         "team": team,
  //         "registered": registered,
  //         "suitable": suitable,
  //         "information": information
  //       }
  //     )

  //   }

  //   console.log(this.availableTeams);
  // }

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
