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

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  event: Event;
  eventRegistrationStatus: number;
  teams : Team[];
  fittingTeams: Team[];
  id: string;
  currentCaptain: Captain|null;
  displayRegistrationPannel: boolean;

  constructor(
    private eventService: EventService,
    private captainService: CaptainService,
    private teamService: TeamService,
    private route : ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.initEvent(); 
    this.initCaptain(); 
    // this.displayRegistrationPannel = false;
    this.displayRegistrationPannel = true;
  }

  initEvent() {
    this.eventService.findById(this.id).subscribe(data => {
      this.event = data;
      this.defineEventRegistrationStatus();
    })    
  }

  initCaptain() {
    let tempCaptainId = '620e64330b5fe13d249b7af7';
    this.captainService.findById(tempCaptainId).subscribe(data => {
      this.currentCaptain = data;
      this.initTeams();
    })
  }

  initTeams() {
    this.teamService.findByCaptainId(this.currentCaptain._id).subscribe(data => {
      this.teams = data;
    })
  }

  checkFittingTeams() {
    for (let team of this.teams) {
      // check nb of fitting members
      let acceptedMembers = [];
      let teamMembers = team.members;
      for (let member of this.teams) {
        // check age        
      }
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
    console.log(teamIndex);
    let newRegistration = new Registration();
    newRegistration.team = this.teams[teamIndex];
    newRegistration.validationStatus = "pending";
    console.log(newRegistration);
    this.eventService.addRegistration(this.id, newRegistration).subscribe(
      next => {},
      error => {}
    );
  }

}
