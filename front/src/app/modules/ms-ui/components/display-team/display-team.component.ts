import { Component, Input, OnInit } from '@angular/core';
import { Team } from 'src/app/models/teams/team';

@Component({
  selector: 'ms-display-team',
  templateUrl: './display-team.component.html',
  styleUrls: ['./display-team.component.scss']
})
export class DisplayTeamComponent implements OnInit {

  @Input() team : Team

  constructor() { }

  ngOnInit(): void {
  }

}
