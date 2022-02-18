import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Team } from 'src/app/models/teams/team';
import { TeamService } from 'src/app/modules/ms-api/team/team.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {

  teams : Team[];
  id: string

  constructor(
    private teamService: TeamService,
    private route : ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.initTeams();
  }

  initTeams() {
    this.teamService.findByCaptainId(this.id).subscribe(data => {
      this.teams = data;
      //Si aucune équipe n'est selectionnée, selectionner la première par défaut
      if(this.route.snapshot.url.length === 3)
      this.router.navigateByUrl(`captain/${this.id}/teams/${this.teams[0]._id}`)
    })
  }

}
