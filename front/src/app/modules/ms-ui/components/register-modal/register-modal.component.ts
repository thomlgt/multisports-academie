import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from 'src/app/auth/authentication.service';

@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.scss']
})
export class RegisterModalComponent implements OnInit {

  registerForm = this.fb.group({
    firstname : ["", Validators.required],
    lastname : ["", Validators.required],
    email : ["", Validators.required],
    password : ["", Validators.required],
    passwordValidation : ["", Validators.required],
    phone: ["", Validators.required],
    birthdate: ["", Validators.required],
    gender : 1,
    acceptContract : [false, Validators.requiredTrue]
  })

  isRegistrationComplete = false;

  constructor(
    public activeModal: NgbActiveModal,
    private fb : FormBuilder,
    private authService : AuthenticationService
    ) { }

  ngOnInit(): void {
  }

  register() {
    if(this.registerForm.value.password === this.registerForm.value.passwordValidation) {
      this.authService.register(this.registerForm.value).subscribe(() => {
        this.isRegistrationComplete = true;
      })
    } else {
      // TODO : erreur passwords différents
    }
    
  }

}
