import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from 'src/app/auth/authentication.service';
import { SafeCaptain } from 'src/app/models/captain/safeCaptain';
import { LoginModalComponent } from '../../login-modal/login-modal.component';

@Component({
  selector: 'ms-captain-control',
  templateUrl: './captain-control.component.html',
  styleUrls: ['./captain-control.component.scss']
})
export class CaptainControlComponent implements OnInit {

  isConnect : boolean;
  currentCaptain : SafeCaptain;

  constructor(
    private authService : AuthenticationService,
    private modalService: NgbModal,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.checkConnection();
  }

  open() {
    const modalRef = this.modalService.open(LoginModalComponent, { centered: true, size: 'xl'});
    modalRef.componentInstance.loginEvent.subscribe(() => {
      this.checkConnection()
    });
  }

  checkConnection() {
    this.isConnect = this.authService.isConnect;
    if(this.isConnect) {
      this.currentCaptain = JSON.parse(localStorage.getItem("currentCaptain")).captain
    }
  }

  logout() {
    this.authService.logout();
    this.currentCaptain = null;
    this.checkConnection();
  }

  goToProfile() {
    this.router.navigateByUrl(`/captain/${this.currentCaptain._id}`)
  }

}
