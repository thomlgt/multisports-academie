import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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

  passForm = this.fb.group({
    password: "",
    newPassword: "",
    newPasswordValidation: ""
  })

  constructor(
    private captainService: CaptainService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
  }

  updatePassword() {
    if (this.passForm.value.newPassword === this.passForm.value.newPasswordValidation) {
      this.captainService.updatePassword(this.id, this.passForm.value).subscribe(() => {
        this.confirmPasswordUpdate = true;
        this.passForm.reset();
        setTimeout(() => {
          this.confirmPasswordUpdate = false;
        }, 9000);
      })
    } else {
      // TODO : passwords différents
    }

  }

}
