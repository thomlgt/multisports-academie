import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CaptainService } from 'src/app/modules/ms-api/captain/captain.service';

@Component({
  selector: 'app-update-password-form',
  templateUrl: './update-password-form.component.html',
  styleUrls: ['./update-password-form.component.scss']
})
export class UpdatePasswordFormComponent implements OnInit {

  id: string;
  confirmPasswordUpdate = false;
  passwordUpdateError = false;

  passForm = this.fb.group({
    password: ["", Validators.required],
    newPassword: ["", Validators.minLength(8)],
    newPasswordValidation: ["", Validators.minLength(8)]
  })

  constructor(
    private captainService: CaptainService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
  }


  get form() { 
    return this.passForm.controls; 
  }

  updatePassword() {
    if(this.passForm.valid) {
      if (this.passForm.value.newPassword === this.passForm.value.newPasswordValidation) {
        this.captainService.updatePassword(this.id, this.passForm.value).subscribe(() => {
          this.confirmPasswordUpdate = true;
          this.passForm.reset();
          setTimeout(() => {
            this.confirmPasswordUpdate = false;
          }, 9000);
        })
      }
    } else {
      this.passwordUpdateError = true;
      setTimeout(() => {
        this.passwordUpdateError = false;
      }, 9000);
    }
  }

}
