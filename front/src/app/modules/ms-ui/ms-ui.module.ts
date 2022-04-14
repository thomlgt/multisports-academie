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
import { DisplayRegistrationComponent } from './components/display-registration/display-registration.component';
import { SportPicturesDirectionComponent } from './components/sport-pictures-direction/sport-pictures-direction.component';
import { EnrolTeamComponent } from './components/enrol-team/enrol-team.component';
import { ValuesComponent } from './components/values/values.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GalleryComponent, PictureModale } from './components/picture/gallery/gallery.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { AdminMenuComponent } from './components/admin-menu/admin-menu.component';
import { UploadPictureComponent, UploadPictureModale } from './components/picture/upload-picture/upload-picture.component';


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
    AddTeamComponent,
    DisplayRegistrationComponent,
    SportPicturesDirectionComponent,
    EnrolTeamComponent,
    ValuesComponent,
    ContactFormComponent,
    GalleryComponent,
    PictureModale,
    AdminMenuComponent,
    UploadPictureComponent,
    UploadPictureModale
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    FontAwesomeModule
  ],
  exports: [
    NavbarComponent,
    SocialComponent,
    FooterComponent,
    ButtonComponent,
    DisplayTeamComponent,
    DisplayMemberComponent,
    DisplayCaptainComponent,
    DisplayRegistrationComponent,
    SportPicturesDirectionComponent,
    ValuesComponent,
    ContactFormComponent,
    GalleryComponent,
    PictureModale,
    AdminMenuComponent,
    UploadPictureComponent
  ]
})
export class MsUiModule {
  constructor() {
    library.add(fas, far, fab);
  }
 }
