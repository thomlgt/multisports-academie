import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client.component';
import { EventsReadingComponent } from './pages/events-reading/events-reading.component';

const routes: Routes = [
  { path: '', component: ClientComponent },
  { path: 'events', component: EventsReadingComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
