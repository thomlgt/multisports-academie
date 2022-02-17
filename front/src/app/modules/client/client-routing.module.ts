import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client.component';
import { EventsReadingComponent } from './pages/events-reading/events-reading.component';
import { ProfileComponent } from './pages/profile/profile.component';

const routes: Routes = [
  { 
    path: '', component: ClientComponent,
      children : [
        { path: 'captain/:id', component: ProfileComponent },
        { path: 'events', component: EventsReadingComponent },
      ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
