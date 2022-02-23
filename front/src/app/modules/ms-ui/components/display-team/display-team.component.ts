import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Team } from 'src/app/models/teams/team';

@Component({
  selector: 'ms-display-team',
  templateUrl: './display-team.component.html',
  styleUrls: ['./display-team.component.scss']
})
export class DisplayTeamComponent implements OnInit {

  @Input() team : Team

  constructor(private router : Router) { }

  ngOnInit(): void {
  }

  goToTeamEdit() {
    this.router.navigateByUrl(`/captain/${this.team.captain._id}/teams/${this.team._id}`)
  }

}
