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

  findById(id : string) {
    return this.http.get<Activity>(`${environment.apiUrl}/activities/${id}`);
  }

  findAllActivitiesByEventId() {
    // TODO: implémenter cette méthode et la route correspondante dans le back
  }

  addActivity(activity: Activity) {
    return this.http.post<Activity>(`${environment.apiUrl}/activities`, activity);
  }

  updateActivity(id: string, activity: Activity) {
    return this.http.patch<Activity>(`${environment.apiUrl}/activities/${id}`, activity);
  }

  deleteActivity(id : string) {
    return this.http.delete<Activity>(`${environment.apiUrl}/activities/${id}`);
  }

}