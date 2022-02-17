import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from 'src/app/auth/authentication.service';
import { RegisterModalComponent } from '../register-modal/register-modal.component';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {

  loginForm = this.fb.group({
    email : "",
    password : ""
  })

  constructor(
    public activeModal: NgbActiveModal,
    private fb : FormBuilder,
    private authService : AuthenticationService,
    private modalService: NgbModal
    ) { }

  ngOnInit(): void {
  }

  openRegister() {
    this.activeModal.close();
    const modalRef = this.modalService.open(RegisterModalComponent, { centered: true });
  }

  login() {
    this.authService.login(
      this.loginForm.value.email,
      this.loginForm.value.password)
      .subscribe(() => {
        this.activeModal.close()
      }, err => {
        //TODO : afficher message erreur
      })
  }

}
