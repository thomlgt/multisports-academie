import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/auth/authentication.service';
import { Captain } from 'src/app/models/captain/captain';
import { CaptainService } from 'src/app/modules/ms-api/captain/captain.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  captain: Captain;
  id: string;
  confirmPersonalUpdate = false;
  confirmPasswordUpdate = false;

  personalForm = this.fb.group({
    firstname: "",
    lastname: "",
    phone: "",
    email: ""
  })

  passForm = this.fb.group({
    password: "",
    newPassword: "",
    newPasswordValidation: ""
  })

  constructor(
    private captainService: CaptainService,
    private authService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.initCaptain();
  }

  initCaptain() {
    this.captainService.findById(this.id).subscribe(data => {
      this.captain = data;
      this.personalForm.patchValue(this.captain)
    })
  }

  updatePersonal() {
    this.captainService.updatePersonal(this.id, this.personalForm.value).subscribe(() => {
      this.confirmPersonalUpdate = true;
      setTimeout(() => {
        this.confirmPersonalUpdate = false;
      }, 9000);
    })
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

  logout() {
    this.authService.logout();
    this.router.navigateByUrl("");
  }

}
