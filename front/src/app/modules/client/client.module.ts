import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ClientComponent } from './client.component';
import { MsApiModule } from '../ms-api/ms-api.module';
import { MsUiModule } from '../ms-ui/ms-ui.module';
import { ProfileComponent } from './pages/profile/profile.component';
import { EventsReadingComponent } from './pages/events-reading/events-reading.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UpdatePersonalFormComponent } from './components/profile/update-personal-form/update-personal-form.component';
import { UpdatePasswordFormComponent } from './components/profile/update-password-form/update-password-form.component';
import { EventsReadingEventComponent } from './components/events/events-reading-event/events-reading-event.component';
import { TeamsComponent } from './pages/teams/teams.component';
import { TeamEditComponent } from './components/teams/team-edit/team-edit.component';
import { EventComponent } from './pages/event/event.component';
import { ActivityThumbnailComponent } from './components/activities/activity-thumbnail/activity-thumbnail.component';
import { EventActivitiesComponent } from './components/activities/event-activities/event-activities.component';
import { ActivityComponent } from './pages/activity/activity.component';
import { HomeComponent } from './pages/home/home.component';
import { ArticleThumbnailComponent } from './components/articles/article-thumbnail/article-thumbnail.component';
import { EllipsisPipe } from 'src/app/helpers/pipes/ellipsis.pipe';
import { ArticlesComponent } from './pages/articles/articles/articles.component';
import { ArticleComponent } from './pages/articles/article/article.component';
import { ArticleThumbnailListComponent } from './components/articles/article-thumbnail-list/article-thumbnail-list.component';


@NgModule({
  declarations: [
    ClientComponent,
    ProfileComponent,
    EventsReadingComponent,
    EventsReadingEventComponent,
    UpdatePersonalFormComponent,
    UpdatePasswordFormComponent,
    TeamsComponent,
    TeamEditComponent,
    EventComponent,
    ActivityThumbnailComponent,
    EventActivitiesComponent,
    ActivityComponent,
    HomeComponent,
    ArticleThumbnailComponent,
    ArticleThumbnailListComponent,
    EllipsisPipe,
    ArticlesComponent,
    ArticleComponent
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
