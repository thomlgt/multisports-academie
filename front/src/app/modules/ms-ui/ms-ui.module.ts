import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SocialComponent } from './components/social/social.component';
import { FooterComponent } from './components/footer/footer.component';
import { CaptainControlComponent } from './components/navbar/captain-control/captain-control.component';


@NgModule({
  declarations: [
    NavbarComponent,
    SocialComponent,
    FooterComponent,
    CaptainControlComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NavbarComponent,
    SocialComponent,
    FooterComponent
  ]
})
export class MsUiModule { }
