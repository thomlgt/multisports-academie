import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SafeCaptain } from 'src/app/models/captain/safeCaptain';

@Injectable({
  providedIn: 'root'
})
export class CaptainService {

  constructor(private http: HttpClient) { }

  findAll() {
    return this.http.get<SafeCaptain[]>("http://localhost:3000/captains");
  }
}
