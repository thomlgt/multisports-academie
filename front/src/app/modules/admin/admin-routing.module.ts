import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAuthGuardService } from 'src/app/admin/admin-auth-guard.service';
import { AdminComponent } from './admin.component';
import { ActivitiesComponent } from './pages/activities/activities.component';
import { ArticlesComponent } from './pages/articles/articles.component';
import { BoardComponent } from './pages/board/board.component';
import { CaptainsComponent } from './pages/captains/captains.component';
import { EventDetailsComponent } from './pages/event-details/event-details.component';
import { EventsComponent } from './pages/events/events.component';
import { ImagesComponent } from './pages/images/images.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  { 
    path: '', component: AdminComponent,
    children: [
      { path: 'board', component: BoardComponent, canActivate: [AdminAuthGuardService] },
      { path: 'captains', component: CaptainsComponent, canActivate: [AdminAuthGuardService] },
      { path: 'images', component: ImagesComponent, canActivate: [AdminAuthGuardService] },
      { path: 'activities', component: ActivitiesComponent, canActivate: [AdminAuthGuardService] },
      { path: 'events', component: EventsComponent, canActivate: [AdminAuthGuardService] },
      { path: 'events/:id', component: EventDetailsComponent, canActivate: [AdminAuthGuardService] },
      { path: 'articles', component: ArticlesComponent, canActivate: [AdminAuthGuardService] },
      { path: 'login', component: LoginComponent },
      { path: '**', redirectTo: 'board' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
