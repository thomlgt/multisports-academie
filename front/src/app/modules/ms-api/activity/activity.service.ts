import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Activity } from 'src/app/models/activity/activity.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  constructor(private http : HttpClient) { }

  findAll() {
    return this.http.get<Activity[]>(`${environment.apiUrl}/activities`);
  }

  findAllActivitiesByEventId() {
    // TODO: implémenter cette méthode et la route correspondante dans le back
  }
}
