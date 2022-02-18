import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SocialComponent } from './components/social/social.component';
import { FooterComponent } from './components/footer/footer.component';
import { CaptainControlComponent } from './components/navbar/captain-control/captain-control.component';
import { ButtonComponent } from './components/button/button.component';
import { LoginModalComponent } from './components/login-modal/login-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterModalComponent } from './components/register-modal/register-modal.component';
import { DisplayTeamComponent } from './components/display-team/display-team.component';
import { DisplayMemberComponent } from './components/display-member/display-member.component';
import { DisplayCaptainComponent } from './components/display-captain/display-captain.component';
import { AddMemberComponent } from './components/add-member/add-member.component';
import { AddTeamComponent } from './components/add-team/add-team.component';


@NgModule({
  declarations: [
    NavbarComponent,
    SocialComponent,
    FooterComponent,
    CaptainControlComponent,
    ButtonComponent,
    LoginModalComponent,
    RegisterModalComponent,
    DisplayTeamComponent,
    DisplayMemberComponent,
    DisplayCaptainComponent,
    AddMemberComponent,
    AddTeamComponent
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
    ButtonComponent,
    DisplayTeamComponent,
    DisplayMemberComponent,
    DisplayCaptainComponent
  ]
})
export class MsUiModule { }
