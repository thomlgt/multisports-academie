import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Team } from 'src/app/models/teams/team';
import { TeamService } from 'src/app/modules/ms-api/team/team.service';
import { AddMemberComponent } from 'src/app/modules/ms-ui/components/add-member/add-member.component';

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
    private teamService : TeamService,
    private modalService: NgbModal
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

  open() {
    const modalRef = this.modalService.open(AddMemberComponent, { centered: true })
    modalRef.componentInstance.id = this.idTeam;
    modalRef.componentInstance.memberAddedEvent.subscribe(() => {
      this.initTeam()
    })
  }

}
