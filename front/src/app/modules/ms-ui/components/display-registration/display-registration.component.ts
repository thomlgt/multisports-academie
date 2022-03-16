import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Event } from 'src/app/models/event/event';
import { Registration } from 'src/app/models/event/registration';

@Component({
  selector: 'ms-display-registration',
  templateUrl: './display-registration.component.html',
  styleUrls: ['./display-registration.component.scss']
})
export class DisplayRegistrationComponent implements OnInit {

  @Input() event : Event;
  idTeam : string;
  registration : Registration;
  scoreTotal : number = 0;

  constructor(private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.idTeam = this.route.snapshot.params["idTeam"];
    this.createRegistration();
    this.calculerScore();
  }

  createRegistration() {
    this.registration = this.event.registrations.filter(registration => registration.team._id == this.idTeam)[0];
  }

  calculerScore() {
    if(this.registration.scores) {
      this.registration.scores.forEach(score => {
        this.scoreTotal += score.points
      });
    }
  }

}
