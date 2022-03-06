import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Captain } from 'src/app/models/captain/captain';
import { CaptainService } from 'src/app/modules/ms-api/captain/captain.service';

@Component({
  selector: 'app-update-personal-form',
  templateUrl: './update-personal-form.component.html',
  styleUrls: ['./update-personal-form.component.scss']
})
export class UpdatePersonalFormComponent implements OnInit {

  @Input() captain: Captain;
  confirmPersonalUpdate = false;

  personalForm = this.fb.group({
    firstname: "",
    lastname: "",
    phone: "",
    email: ""
  })

  constructor(
    private captainService: CaptainService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.personalForm.patchValue(this.captain);
  }

  updatePersonal() {
    this.captainService.updatePersonal(this.captain._id, this.personalForm.value).subscribe(() => {
      this.confirmPersonalUpdate = true;
      setTimeout(() => {
        this.confirmPersonalUpdate = false;
      }, 9000);
    })
  }

}
