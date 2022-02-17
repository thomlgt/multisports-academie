import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ClientComponent } from './client.component';
import { MsApiModule } from '../ms-api/ms-api.module';
import { MsUiModule } from '../ms-ui/ms-ui.module';
import { ProfileComponent } from './pages/profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ClientComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    MsApiModule,
    MsUiModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ClientModule { }
