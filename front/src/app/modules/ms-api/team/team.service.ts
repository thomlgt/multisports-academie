import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Team } from 'src/app/models/teams/team';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private http : HttpClient) { }

  findAll() {
    return this.http.get<Team[]>("http://localhost:3000/teams");
  }
}
