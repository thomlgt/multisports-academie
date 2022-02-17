import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SafeEvent } from 'src/app/models/event/safeEvent';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) { }

  findAll() {
    return this.http.get<SafeEvent[]>("http://localhost:3000/events");
  }

}
