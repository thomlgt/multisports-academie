import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { MsUiModule } from '../ms-ui/ms-ui.module';
import { MsApiModule } from '../ms-api/ms-api.module';
import { BoardComponent } from './pages/board/board.component';
import { CaptainsComponent } from './pages/captains/captains.component';
import { ActivitiesComponent } from './pages/activities/activities.component';
import { ImagesComponent } from './pages/images/images.component';
import { EventsComponent } from './pages/events/events.component';
import { ArticlesComponent } from './pages/articles/articles.component';


@NgModule({
  declarations: [
    AdminComponent,
    BoardComponent,
    CaptainsComponent,
    ActivitiesComponent,
    ImagesComponent,
    EventsComponent,
    ArticlesComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MsUiModule,
    MsApiModule
  ]
})
export class AdminModule { }
