import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from 'src/app/auth/auth-guard.service';
import { ClientComponent } from './client.component';
import { TeamEditComponent } from './components/teams/team-edit/team-edit.component';
import { EventComponent } from './pages/event/event.component';
import { EventsReadingComponent } from './pages/events-reading/events-reading.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { TeamsComponent } from './pages/teams/teams.component';

const routes: Routes = [
  { 
    path: '', component: ClientComponent,
      children : [
        { path: 'home', component: HomeComponent },
        { path: 'captain/:id', component: ProfileComponent, canActivate: [AuthGuardService] },
        { 
          path: 'captain/:id/teams', component: TeamsComponent, canActivate: [AuthGuardService],
            children : [
              { path: ":idTeam", component: TeamEditComponent, canActivate: [AuthGuardService] }
            ] 
        },
        { path: 'events', component: EventsReadingComponent },
        { path: 'event/:id', component: EventComponent },
        { path: '**', redirectTo: "home"}
      ]
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
