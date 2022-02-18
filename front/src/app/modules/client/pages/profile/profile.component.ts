import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/auth/authentication.service';
import { Captain } from 'src/app/models/captain/captain';
import { SafeCaptain } from 'src/app/models/captain/safeCaptain';
import { Team } from 'src/app/models/teams/team';
import { CaptainService } from 'src/app/modules/ms-api/captain/captain.service';
import { TeamService } from 'src/app/modules/ms-api/team/team.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  captain : Captain
  teams : Team[];
  id : string

  constructor(
    private authService: AuthenticationService,
    private captainService: CaptainService,
    private teamService: TeamService,
    private router: Router,
    private route : ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"]
    this.initCaptain();
    this.initTeams();
  }

  initTeams() {
    this.teamService.findByCaptainId(this.id).subscribe(data => {
      this.teams = data;
    })
  }

  
  initCaptain() {
    this.captainService.findById(this.id).subscribe(data => {
      this.captain = data;
    })
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl("");
  }

}
