import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Member } from 'src/app/models/members/member';
import { Team } from 'src/app/models/teams/team';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private http : HttpClient) { }

  findAll() {
    return this.http.get<Team[]>(`${environment.apiUrl}/teams`);
  }

  findById(id: string) {
    return this.http.get<Team>(`${environment.apiUrl}/teams/${id}`);
  }

  findByCaptainId(id: string) {
    return this.http.get<Team[]>(`${environment.apiUrl}/teams/captain/${id}`);
  }

  addTeam(team: Team) {
    return this.http.post<Team>(`${environment.apiUrl}/teams`, team);
  }

  addMember(id: string, member: Member) {
    return this.http.post<Team>(`${environment.apiUrl}/teams/${id}/members`, member);
  }

  deleteMember(id: string, member: Member) {
    return this.http.delete<Team>(`${environment.apiUrl}/teams/${id}/members`, {body: member});
  }

  deleteTeam(id: string) {
    return this.http.delete<Team>(`${environment.apiUrl}/teams/${id}`)
  }
}
