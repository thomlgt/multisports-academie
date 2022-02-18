import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Member } from 'src/app/models/members/member';
import { Team } from 'src/app/models/teams/team';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private http : HttpClient) { }

  findAll() {
    return this.http.get<Team[]>("http://localhost:3000/teams");
  }

  findById(id: string) {
    return this.http.get<Team>(`http://localhost:3000/teams/${id}`);
  }

  findByCaptainId(id: string) {
    return this.http.get<Team[]>(`http://localhost:3000/teams/captain/${id}`);
  }

  addMember(id: string, member: Member) {
    return this.http.post<Team>(`http://localhost:3000/teams/${id}/members`, member);
  }
}
