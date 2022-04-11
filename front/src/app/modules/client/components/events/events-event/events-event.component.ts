import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from 'src/app/auth/authentication.service';
import { Captain } from 'src/app/models/captain/captain';
import { SafeEvent } from 'src/app/models/event/safeEvent';
import { Team } from 'src/app/models/teams/team';
import { TeamService } from 'src/app/modules/ms-api/team/team.service';
import { EnrolTeamComponent } from 'src/app/modules/ms-ui/components/enrol-team/enrol-team.component';

@Component({
  selector: 'app-events-event',
  templateUrl: './events-event.component.html',
  styleUrls: ['./events-event.component.scss']
})
export class EventsEventComponent implements OnInit {

  @Input() event : SafeEvent;
  eventRegistrationStatus: number;

  currentCaptain: Captain|null;
  
  eventTeams: Team[];
  captainTeams: Team[];  
  availableTeams: any[];
  hasRecordedTeam: boolean;

  constructor(
    private teamService: TeamService,
    private router: Router,
    private authenticationService: AuthenticationService,
    private modalService : NgbModal
  ) { }

  ngOnInit(): void {
    this.eventTeams = [];
    this.captainTeams = [];
    this.availableTeams = [];
    this.hasRecordedTeam = false;
    this.defineEventRegistrationStatus();
    this.initEventTeams();
  }

  /** Event redirection */

  goToEvent() {
    this.router.navigateByUrl(`/event/${this.event._id}`);
  }

  /** Event registration */

  defineEventRegistrationStatus() {
    let currentDate = new Date();
    let startRegistration = new Date(this.event.startRegistration);
    let endRegistration = new Date(this.event.endRegistration);

    // before registration
    if (currentDate < startRegistration) {
      this.eventRegistrationStatus = 1;
    // during registration
    } else if (currentDate >= startRegistration && currentDate <= endRegistration) {
      this.eventRegistrationStatus = 2;
    // after registration
    } else {
      this.eventRegistrationStatus = 3;
    }
  }

  openRegistrationModal() {
    const modalRef = this.modalService.open(EnrolTeamComponent, {centered : true});
    modalRef.componentInstance.id = this.event._id;
    modalRef.componentInstance.event = this.event;
    modalRef.componentInstance.captainTeams = this.captainTeams;
    modalRef.componentInstance.availableTeams = this.availableTeams;
    modalRef.componentInstance.hasRecordedTeam = this.hasRecordedTeam;
    modalRef.componentInstance.enrolTeamEvent.subscribe(() => {
      window.location.reload();
    })
  }
  
  initEventTeams() {
    let registrations = this.event.registrations;
    let nbTeams = registrations.length;
    let i = 0;
    if (nbTeams > 0) {
      for (let registration of registrations) { 
        this.eventTeams.push(registration.team);
        i++;
        if (i === nbTeams) {        
          this.initCaptain();
        }
      }
    } else {
      this.initCaptain();
    }
  }

  initCaptain() {
    // check if authenticated
    let authenticatedCaptain = this.authenticationService.currentCaptainValue;
    if (authenticatedCaptain) {
      this.currentCaptain = authenticatedCaptain.captain;
      this.initCaptainTeams();
    }
  }

  initCaptainTeams() {
    this.teamService.findByCaptainId(this.currentCaptain._id).subscribe(data => {
      this.captainTeams = data;
      this.checkAvailableTeams();
    })
  }

  checkAvailableTeams() {
    for (let team of this.captainTeams) {
      let information: string;
      let registered: boolean;
      let suitable: boolean;
      
      // check if registered
      if (this.eventTeams.length > 0) {      
        if (this.eventTeams.some(eventTeam => eventTeam._id === team._id)) {
          registered = true;
          this.hasRecordedTeam = true;
        } else {
          registered = false;
        }
      } else {
        registered = false;
      }

      // check nb of fitting members
      let acceptedMembers = [];
      let teamMembers = team.members;
      const today = new Date();
      for (let member of teamMembers) {
        // check age  
        let birthDate = new Date(member.birthdate);
        let age = today.getFullYear() - birthDate.getFullYear();
        let m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        if (age < this.event.minAge) {
          information = `Les participants doivent avoir au moins ${this.event.minAge} ans.`;
          suitable = false;
          acceptedMembers = [];
          break;
        } else {
          acceptedMembers.push(member);
        }
      }

      if (acceptedMembers.length + 1 < this.event.minMembers) {
        information = `Il doit y avoir au moins ${this.event.minMembers} membre(s) dans une équipe.`;
        suitable = false;
      } else if (acceptedMembers.length + 1 > this.event.maxMembers){
        information = `Il ne doit pas y avoir plus de ${this.event.maxMembers} membre(s) dans une équipe.`;
        suitable = false;
      } else {
        let nbFemales = 0;
        for (let member of acceptedMembers) {
          if (member.gender == 2) {
            nbFemales++;
          }
        }
        if (nbFemales >= this.event.minFemale) {
          suitable = true;
        } else {
          information = `Il doit y avoir au moins ${this.event.minFemale} femmes dans une équipe.`;
          suitable = false;
        }
      }

      this.availableTeams.push(
        {
          "team": team,
          "registered": registered,
          "suitable": suitable,
          "information": information
        }
      )

    }

  }

}
