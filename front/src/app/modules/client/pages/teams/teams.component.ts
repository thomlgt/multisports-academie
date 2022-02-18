import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Team } from 'src/app/models/teams/team';
import { TeamService } from 'src/app/modules/ms-api/team/team.service';
import { AddTeamComponent } from 'src/app/modules/ms-ui/components/add-team/add-team.component';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {

  teams : Team[];
  id: string;
  displayEdition = false;

  constructor(
    private teamService: TeamService,
    private route : ActivatedRoute,
    private router: Router,
    private modalService : NgbModal
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.initTeams();
  }

  initTeams() {
    this.teamService.findByCaptainId(this.id).subscribe(data => {
      this.teams = data;
    })
  }

  deleteTeam(teamId : string) {
    this.teamService.deleteTeam(teamId).subscribe(() => {
      this.initTeams();
    })
  }

  openEditor() {
    this.displayEdition = true;
  }

  open() {
    const modalRef = this.modalService.open(AddTeamComponent, {centered : true});
    modalRef.componentInstance.id = this.id;
    modalRef.componentInstance.teamAddedEvent.subscribe(() => {
      this.initTeams()
    })
  }

}
