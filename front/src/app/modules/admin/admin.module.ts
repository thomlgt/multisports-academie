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
import { DisplayAdminCaptainComponent } from './components/captains/display-admin-captain/display-admin-captain.component';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from 'src/app/helpers/jwt.interceptor';
import { DisplayAdminEventComponent } from './components/events/display-admin-event/display-admin-event.component';
import { EventDetailsComponent } from './pages/event-details/event-details.component';
import { TeamsDetailsComponent } from './components/event-details/teams-details/teams-details.component';

@NgModule({
  declarations: [
    AdminComponent,
    BoardComponent,
    CaptainsComponent,
    ActivitiesComponent,
    ImagesComponent,
    EventsComponent,
    ArticlesComponent,
    DisplayAdminCaptainComponent,
    LoginComponent,
    DisplayAdminEventComponent,
    EventDetailsComponent,
    TeamsDetailsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MsUiModule,
    MsApiModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers : [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ]
})
export class AdminModule { }
