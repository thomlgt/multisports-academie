import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Event } from 'src/app/models/event/event';
import { Team } from 'src/app/models/teams/team';
import { EventService } from 'src/app/modules/ms-api/event/event.service';
import { TeamService } from 'src/app/modules/ms-api/team/team.service';
import { AddMemberComponent } from 'src/app/modules/ms-ui/components/add-member/add-member.component';

@Component({
  selector: 'app-team-edit',
  templateUrl: './team-edit.component.html',
  styleUrls: ['./team-edit.component.scss']
})
export class TeamEditComponent implements OnInit {

  idTeam : string;
  team : Team
  events : Event[];

  constructor(
    private route : ActivatedRoute,
    private router: Router,
    private teamService : TeamService,
    private eventService: EventService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(data => {
      this.idTeam = data.idTeam;
      this.initTeam()
      this.initEvents();
    })
    
  }

  initTeam() {
    this.teamService.findById(this.idTeam).subscribe(data => {
      this.team = data;
    })
  }

  initEvents() {
    this.eventService.findByTeamRegistration(this.idTeam).subscribe(data => {
      this.events = data;
    })
  }

  open() {
    const modalRef = this.modalService.open(AddMemberComponent, { centered: true })
    modalRef.componentInstance.id = this.idTeam;
    modalRef.componentInstance.memberAddedEvent.subscribe(() => {
      this.initTeam()
    })
  }

  deleteMember(index : number) {
    this.teamService.deleteMember(this.idTeam, this.team.members[index]).subscribe(() => {
      this.initTeam()
    })
  }

  goToEvents() {
    this.router.navigateByUrl("/events")
  }

}
