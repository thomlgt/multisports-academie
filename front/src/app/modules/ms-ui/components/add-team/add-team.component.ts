import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Team } from 'src/app/models/teams/team';
import { TeamService } from 'src/app/modules/ms-api/team/team.service';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.css']
})
export class AddTeamComponent implements OnInit {

  addTeamForm : FormGroup;

  @Input() id : string;

  @Output() teamAddedEvent = new EventEmitter<void>();

  constructor(
    private activeModal: NgbActiveModal,
    private fb : FormBuilder,
    private teamService: TeamService
  ) { }

  ngOnInit(): void {
    this.addTeamForm = this.fb.group({
      name : ["", Validators.required],
      captain : this.fb.group({
        _id : this.id
      }),
      members : this.fb.array([])
    })
  }

  addTeam() {
    this.teamService.addTeam(this.addTeamForm.value).subscribe(() => {
      this.teamAddedEvent.emit();
      this.activeModal.close();
    })
  }

}
