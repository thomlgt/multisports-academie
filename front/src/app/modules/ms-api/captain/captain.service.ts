import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Captain } from 'src/app/models/captain/captain';
import { SafeCaptain } from 'src/app/models/captain/safeCaptain';

@Injectable({
  providedIn: 'root'
})
export class CaptainService {

  constructor(private http: HttpClient) { }

  findAll() {
    return this.http.get<SafeCaptain[]>("http://localhost:3000/captains");
  }

  findById(id : string) {
    return this.http.get<Captain>(`http://localhost:3000/captains/${id}`);
  }
}
