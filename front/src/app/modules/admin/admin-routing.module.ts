import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { ActivitiesComponent } from './pages/activities/activities.component';
import { ActivityComponent } from './pages/activity/activity.component';
import { ArticlesComponent } from './pages/articles/articles.component';
import { BoardComponent } from './pages/board/board.component';
import { CaptainsComponent } from './pages/captains/captains.component';
import { EventsComponent } from './pages/events/events.component';
import { ImagesComponent } from './pages/images/images.component';

const routes: Routes = [
  { 
    path: '', component: AdminComponent,
    children: [
      { path: 'board', component: BoardComponent },
      { path: 'captains', component: CaptainsComponent },
      { path: 'images', component: ImagesComponent },
      { path: 'activities', component: ActivitiesComponent },
      { path: 'activity', component: ActivityComponent },
      { path: 'events', component: EventsComponent },
      { path: 'articles', component: ArticlesComponent },
      { path: '**', redirectTo: 'board' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
