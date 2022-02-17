import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ClientComponent } from './client.component';
import { MsApiModule } from '../ms-api/ms-api.module';
import { MsUiModule } from '../ms-ui/ms-ui.module';
import { ProfileComponent } from './pages/profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UpdatePersonalFormComponent } from './components/profile/update-personal-form/update-personal-form.component';
import { UpdatePasswordFormComponent } from './components/profile/update-password-form/update-password-form.component';


@NgModule({
  declarations: [
    ClientComponent,
    ProfileComponent,
    UpdatePersonalFormComponent,
    UpdatePasswordFormComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    MsApiModule,
    MsUiModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ClientModule { }
