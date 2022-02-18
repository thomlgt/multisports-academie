import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from 'src/app/auth/auth-guard.service';
import { ClientComponent } from './client.component';
import { TeamEditComponent } from './components/teams/team-edit/team-edit.component';
import { EventsReadingComponent } from './pages/events-reading/events-reading.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { TeamsComponent } from './pages/teams/teams.component';

const routes: Routes = [
  { 
    path: '', component: ClientComponent,
      children : [
        { path: 'captain/:id', component: ProfileComponent, canActivate: [AuthGuardService] },
        { 
          path: 'captain/:id/teams', component: TeamsComponent, canActivate: [AuthGuardService],
            children : [
              { path: ":id", component: TeamEditComponent, canActivate: [AuthGuardService] }
            ] 
        },
        { path: 'events', component: EventsReadingComponent },
      ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
