import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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

  currentCaptain;

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
  }

  checkConnection() {
    this.authService.currentCaptain.subscribe((data) => {
      this.currentCaptain = data;
    })
  }

  goToProfile() {
    this.router.navigateByUrl(`/captain/${this.currentCaptain.captain._id}`);
  }

  goToTeamsEdit() {
    this.router.navigateByUrl(`/captain/${this.currentCaptain.captain._id}/teams`);
  }

}
