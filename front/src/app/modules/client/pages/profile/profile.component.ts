import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/auth/authentication.service';
import { Captain } from 'src/app/models/captain/captain';
import { SafeCaptain } from 'src/app/models/captain/safeCaptain';
import { CaptainService } from 'src/app/modules/ms-api/captain/captain.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  captain : Captain
  id : string

  constructor(
    private authService: AuthenticationService,
    private captainService: CaptainService,
    private router: Router,
    private route : ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"]
    this.initCaptain();
  }

  
  initCaptain() {
    this.captainService.findById(this.id).subscribe(data => {
      this.captain = data;
    })
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl("");
  }

}
