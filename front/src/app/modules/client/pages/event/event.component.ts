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

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  event: Event;
  eventRegistrationStatus: number;
  
  eventTeams: Team[];
  captainTeams: Team[];  
  availableTeams: any[];
  hasRecordedTeam: boolean;

  
  id: string;
  currentCaptain: Captain|null;
  displayRegistrationPannel: boolean;


  constructor(
    private eventService: EventService,
    private captainService: CaptainService,
    private teamService: TeamService,
    private route : ActivatedRoute,
    private router: Router,
  ) { 
    this.eventTeams = [];
    this.availableTeams = [];
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.initEvent(); 
    this.initCaptain(); 
    this.hasRecordedTeam = false;
    // this.displayRegistrationPannel = false;
    this.displayRegistrationPannel = true;
  }

  initEvent() {
    this.eventService.findById(this.id).subscribe(data => {
      this.event = data;
      this.defineEventRegistrationStatus();
      this.initEventTeams();
    })    
  }

  initEventTeams() {
    let registrations = this.event.registrations;
    for (let registration of registrations) {
      console.log(registration.team);
      this.eventTeams.push(registration.team);
    }
  }

  initCaptain() {
    let tempCaptainId = '620e64330b5fe13d249b7af7';
    this.captainService.findById(tempCaptainId).subscribe(data => {
      this.currentCaptain = data;
      this.initCaptainTeams();
    })
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
        console.log(age);
        if (age < this.event.minAge) {
          information = `Les participans doivent avoir au moins ${this.event.minAge} ans.`;
          suitable = false;
          acceptedMembers = [];
          break;
        } else {
          acceptedMembers.push(member);
        }
      }
      console.log(acceptedMembers.length);
      if (acceptedMembers.length > 0) {
        if (acceptedMembers.length + 1 < this.event.minMembers) {
          information = `Il doit y avoir au moins ${this.event.minMembers} membres dans une équipe.`;
          suitable = false;
        } else if (acceptedMembers.length + 1 > this.event.maxMembers){
          information = `Il ne doit pas y avoir plus de ${this.event.maxMembers} membres dans une équipe.`;
          suitable = false;
        } else {
          suitable = true;
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

  defineEventRegistrationStatus() {

    let currentDate = new Date();
    let startRegistration = new Date(this.event.startRegistration);
    let endRegistration = new Date(this.event.endRegistration);

    if (currentDate < startRegistration) {
      this.eventRegistrationStatus = 1;
    } else if (currentDate >= startRegistration && currentDate <= endRegistration) {
      this.eventRegistrationStatus = 2;
    } else {
      this.eventRegistrationStatus = 3;
    }
  }

  openRegistrationPanel() {
    this.displayRegistrationPannel = true;
  }

  registerTeam(teamIndex: number) {
    let newRegistration = new Registration();
    newRegistration.team = this.captainTeams[teamIndex];
    newRegistration.validationStatus = "pending";
    this.eventService.addRegistration(this.id, newRegistration).subscribe(
      next => {
        console.log('registration OK !');
        this.initEvent();
      },
      error => {
        console.log('registration has failed !');
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
        this.initEvent();
      },
      error => {
        console.log('Deletion has failed !');
      }
    );
  }

}
