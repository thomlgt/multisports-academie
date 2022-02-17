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

  captain : Captain;
  personalForm = this.fb.group({
    firstname : "",
    lastname : "",
    phone : "",
    email : ""
  })

  constructor(
    private captainService : CaptainService,
    private authService : AuthenticationService,
    private router: Router,
    private route : ActivatedRoute,
    private fb : FormBuilder
    ) { }

  ngOnInit(): void {
    this.initCaptain();
  }

  initCaptain() {
    let id = this.route.snapshot.params['id'];
    this.captainService.findById(id).subscribe(data => {     
      this.captain = data;
      this.personalForm.patchValue(this.captain)
    })
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl("");
  }

}
