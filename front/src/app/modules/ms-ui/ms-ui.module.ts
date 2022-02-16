import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SocialComponent } from './components/social/social.component';
import { FooterComponent } from './components/footer/footer.component';
import { CaptainControlComponent } from './components/navbar/captain-control/captain-control.component';
import { ButtonComponent } from './components/button/button.component';


@NgModule({
  declarations: [
    NavbarComponent,
    SocialComponent,
    FooterComponent,
    CaptainControlComponent,
    ButtonComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NavbarComponent,
    SocialComponent,
    FooterComponent,
    ButtonComponent
  ]
})
export class MsUiModule { }
