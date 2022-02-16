import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/auth/authentication.service';

@Component({
  selector: 'ms-captain-control',
  templateUrl: './captain-control.component.html',
  styleUrls: ['./captain-control.component.scss']
})
export class CaptainControlComponent implements OnInit {

  isConnect : boolean;

  constructor(private authService : AuthenticationService) { }

  ngOnInit(): void {
    this.isConnect = true;
  }

}
