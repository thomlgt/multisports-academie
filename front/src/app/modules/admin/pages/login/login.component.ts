import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminAuthenticationService } from 'src/app/admin/admin-authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = this.fb.group({
    username : ["", Validators.required],
    password : ["", Validators.required]
  })

  displayErrorMessage = false;

  constructor(
    private fb: FormBuilder,
    private adminAuthService: AdminAuthenticationService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  login() {
    this.adminAuthService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe(
      (data) => {
        this.router.navigateByUrl("/admin/board");
      },
      (error) => {
        this.displayErrorMessage = true;
        setTimeout(() => {
          this.displayErrorMessage = false;
        }, 7000)
      }
    );
  }

}
