import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Team } from 'src/app/models/teams/team';
import { TeamService } from 'src/app/modules/ms-api/team/team.service';

@Component({
  selector: 'app-team-edit',
  templateUrl: './team-edit.component.html',
  styleUrls: ['./team-edit.component.css']
})
export class TeamEditComponent implements OnInit {

  idTeam : string;
  team : Team

  constructor(
    private route : ActivatedRoute,
    private teamService : TeamService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(data => {
      this.idTeam = data.idTeam;
      this.initTeam()
    })
    
  }

  initTeam() {
    this.teamService.findById(this.idTeam).subscribe(data => {
      this.team = data;
    })
  }

}
