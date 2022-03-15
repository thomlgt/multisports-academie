import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Event } from 'src/app/models/event/event';
import { Registration } from 'src/app/models/event/registration';
import { SafeEvent } from 'src/app/models/event/safeEvent';
import { Team } from 'src/app/models/teams/team';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) { }

  findAll() {
    return this.http.get<SafeEvent[]>(`${environment.apiUrl}/events`);
  }

  findById(id : string) {
    return this.http.get<Event>(`${environment.apiUrl}/events/${id}`);
  }

  findByTeamRegistration(idTeam : string) {
    return this.http.get<Event[]>(`${environment.apiUrl}/events/team/${idTeam}`)
  }

  addRegistration(id : string, registration: Registration) {
    return this.http.post<Registration>(`${environment.apiUrl}/events/${id}/registrations`, registration);
  }

  cancelRegistration(id : string, registration: Registration) {
    return this.http.delete<Registration>(`http://localhost:3000/events/${id}/registrations`, {body: registration});
  }

}
