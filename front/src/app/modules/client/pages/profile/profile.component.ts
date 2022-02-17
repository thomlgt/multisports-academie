import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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

}
