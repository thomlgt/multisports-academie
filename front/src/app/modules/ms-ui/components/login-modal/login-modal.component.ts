import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from 'src/app/auth/authentication.service';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent implements OnInit {

  loginForm = this.fb.group({
    email : "",
    password : ""
  })

  @Output() loginEvent = new EventEmitter<void>();

  constructor(
    public activeModal: NgbActiveModal,
    private fb : FormBuilder,
    private authService : AuthenticationService
    ) { }

  ngOnInit(): void {
  }

  login() {
    this.authService.login(
      this.loginForm.value.email,
      this.loginForm.value.password)
      .subscribe(() => {
        this.loginEvent.emit();
        this.activeModal.close()
      }, err => {
        //TODO : afficher message erreur
      })
  }

}
