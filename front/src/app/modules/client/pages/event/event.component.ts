import { Component, OnInit } from '@angular/core';
import { SafeEvent } from 'src/app/models/event/safeEvent';
import { Event } from 'src/app/models/event/event';
import { EventService } from 'src/app/modules/ms-api/event/event.service';
import { TeamService } from 'src/app/modules/ms-api/team/team.service';
import { Team } from 'src/app/models/teams/team';
import { ActivatedRoute, Router } from '@angular/router';
import { Captain } from 'src/app/models/captain/captain';
import { CaptainService } from 'src/app/modules/ms-api/captain/captain.service';
import { Registration } from 'src/app/models/event/registration';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { AuthenticationService } from 'src/app/auth/authentication.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EnrolTeamComponent } from 'src/app/modules/ms-ui/components/enrol-team/enrol-team.component';
import { LoginModalComponent } from 'src/app/modules/ms-ui/components/login-modal/login-modal.component';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  id: string;
  event: Event;
  eventRegistrationStatus: number;

  currentCaptain: Captain|null;
  
  eventTeams: Team[];
  captainTeams: Team[];  
  availableTeams: any[];
  hasRecordedTeam: boolean;

  eventTeamsMembers: number;
  remainingDays: number;

  constructor(
    private eventService: EventService,
    private teamService: TeamService,
    private route : ActivatedRoute,
    private authenticationService: AuthenticationService,
    private modalService : NgbModal
  ) { }

  ngOnInit(): void {
    this.eventTeams = [];
    this.captainTeams = [];
    this.availableTeams = [];
    this.hasRecordedTeam = false;
    this.currentCaptain = null;
    this.eventTeamsMembers = 0;
    this.id = this.route.snapshot.params['id'];
    this.initEvent();
  }

  initEvent() {
    this.eventService.findById(this.id).subscribe(data => {
      this.event = data;
      this.defineEventRegistrationStatus();
      this.initEventTeams();
    })    
  }

  dateDiff(first, second) {
    return Math.round((second-first)/(1000*60*60*24));
  }

  defineEventRegistrationStatus() {

    let currentDate = new Date();
    let startRegistration = new Date(this.event.startRegistration);
    let endRegistration = new Date(this.event.endRegistration);

    // before registration
    if (currentDate < startRegistration) {
      this.eventRegistrationStatus = 1;
      this.remainingDays = this.dateDiff(currentDate, startRegistration);
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
    modalRef.componentInstance.id = this.id;
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
        this.eventTeamsMembers += registration.team.members.length + 1;
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
      if (this.eventTeams.some(eventTeam => eventTeam._id === team._id)) {
        registered = true;
        this.hasRecordedTeam = true;
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
          information = `Les participans doivent avoir au moins ${this.event.minAge} ans.`;
          suitable = false;
          acceptedMembers = [];
          break;
        } else {
          acceptedMembers.push(member);
        }
      }
      if (acceptedMembers.length > 0) {
        if (acceptedMembers.length + 1 < this.event.minMembers) {
          information = `Il doit y avoir au moins ${this.event.minMembers} membres dans une équipe.`;
          suitable = false;
        } else if (acceptedMembers.length + 1 > this.event.maxMembers){
          information = `Il ne doit pas y avoir plus de ${this.event.maxMembers} membres dans une équipe.`;
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
            information = `Il doit y avoir au moins ${this.event.minFemale} femme(s) dans une équipe.`;
            suitable = false;
          }

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

  openLoginModal() {
    const modalRef = this.modalService.open(LoginModalComponent, { centered: true, size: 'xl'});
    modalRef.componentInstance.id = this.id;
    modalRef.componentInstance.teamAddedEvent.subscribe(() => {
      this.initEvent();
    })
  }

}
