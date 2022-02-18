import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client.component';
import { ProfileComponent } from './pages/profile/profile.component';

const routes: Routes = [
  { 
    path: '', component: ClientComponent,
      children : [
        { path: 'captain/:id', component: ProfileComponent },
      ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
