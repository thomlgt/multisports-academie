import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SocialComponent } from './components/social/social.component';
import { FooterComponent } from './components/footer/footer.component';
import { CaptainControlComponent } from './components/navbar/captain-control/captain-control.component';
import { ButtonComponent } from './components/button/button.component';
import { LoginModalComponent } from './components/login-modal/login-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    NavbarComponent,
    SocialComponent,
    FooterComponent,
    CaptainControlComponent,
    ButtonComponent,
    LoginModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    NavbarComponent,
    SocialComponent,
    FooterComponent,
    ButtonComponent
  ]
})
export class MsUiModule { }
