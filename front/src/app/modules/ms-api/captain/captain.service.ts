import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Captain } from 'src/app/models/captain/captain';
import { SafeCaptain } from 'src/app/models/captain/safeCaptain';
import { UpdatePasswordCaptain } from 'src/app/models/captain/updatePasswordCaptain';
import { UpdatePersonalCaptain } from 'src/app/models/captain/updatePersonalCaptain';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CaptainService {

  constructor(private http: HttpClient) { }

  findAll() {
    return this.http.get<SafeCaptain[]>(`${environment.apiUrl}/captains`);
  }

  findById(id : string) {
    return this.http.get<Captain>(`${environment.apiUrl}/captains/${id}`);
  }

  updatePersonal(id : string, captain : UpdatePersonalCaptain) {
    return this.http.patch<Captain>(`${environment.apiUrl}/captains/${id}/personal`, captain);
  }

  updatePassword(id : string, captain : UpdatePasswordCaptain) {
    return this.http.patch<Captain>(`${environment.apiUrl}/captains/${id}/password`, captain);
  }
}
