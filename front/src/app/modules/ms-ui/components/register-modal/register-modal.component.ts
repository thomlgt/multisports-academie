import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from 'src/app/auth/authentication.service';
import { LoginModalComponent } from '../login-modal/login-modal.component';

@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.scss']
})
export class RegisterModalComponent implements OnInit {

  registerForm = this.fb.group({
    firstname: ["", Validators.required],
    lastname: ["", Validators.required],
    email: ["", Validators.email],
    password: ["", Validators.minLength(8)],
    passwordValidation: ["", Validators.minLength(8)],
    phone: ["", [Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[0-9]*$')]],
    birthdate: ["", Validators.required],
    gender: 1,
    acceptContract: [false, Validators.requiredTrue]
  })

  isRegistrationComplete = false;
  formErrors = false;
  registrationError = {
    isError: false
  };

  constructor(
    public activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router
  ) { 
  }

  ngOnInit(): void {
  }

  get form() { 
    return this.registerForm.controls; 
  }

  register() {
    if (this.registerForm.valid) {
      if (this.registerForm.value.password === this.registerForm.value.passwordValidation) {
        this.authService.register(this.registerForm.value).subscribe(
          next => {
            this.isRegistrationComplete = true;
          },
          error => {
            this.registrationError.isError = true;
          })
      }
    } else {
      this.formErrors = true;
    }
  }

  close() {
    this.activeModal.close();
  }

  cancel() {
    this.activeModal.close();
    this.modalService.open(LoginModalComponent, { centered: true, size: 'xl', backdrop: true });
  }

  goToLegal() {
    this.activeModal.close();
    this.router.navigateByUrl("/legal")
  }

}
