import { Component, OnInit } from '@angular/core';
import { AdminAuthenticationService } from 'src/app/admin/admin-authentication.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  isConnected = false;

  constructor(private adminAuthService: AdminAuthenticationService) { }

  ngOnInit(): void {
    this.adminAuthService.currentAdmin.subscribe(data => {
      if(data) {
        this.isConnected = true;
      } else {
        this.isConnected = false;
      }
    })
  }

}
