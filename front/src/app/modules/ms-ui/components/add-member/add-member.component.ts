import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TeamService } from 'src/app/modules/ms-api/team/team.service';

@Component({
  selector: 'ms-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.css']
})
export class AddMemberComponent implements OnInit {

  addMemberForm = this.fb.group({
    firstname: ["", Validators.required],
    lastname: ["", Validators.required],
    birthdate: ["", Validators.required],
    gender: [1, Validators.required],
  })

  @Input() id: string;
  @Output() memberAddedEvent = new EventEmitter<void>();

  constructor(
    public activeModal: NgbActiveModal,
    private fb : FormBuilder,
    private teamService : TeamService
  ) { }

  ngOnInit(): void {

  }

  addMember() {
    this.teamService.addMember(this.id, this.addMemberForm.value).subscribe(() => {
      this.memberAddedEvent.emit();
      this.activeModal.close()
    })
  }

}
