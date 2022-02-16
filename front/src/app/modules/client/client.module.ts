import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ClientComponent } from './client.component';
import { MsApiModule } from '../ms-api/ms-api.module';
import { MsUiModule } from '../ms-ui/ms-ui.module';


@NgModule({
  declarations: [
    ClientComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    MsApiModule,
    MsUiModule
  ]
})
export class ClientModule { }
