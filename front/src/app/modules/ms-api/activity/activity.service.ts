import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Activity } from 'src/app/models/activity/activity.model';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  constructor(private http : HttpClient) { }

  findAll() {
    return this.http.get<Activity[]>("http://localhost:3000/activities");
  }
}
