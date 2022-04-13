import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthenticationService {

  private currentAdminSubject: BehaviorSubject<any>;
  public currentAdmin: Observable<any>;

  constructor(private http: HttpClient) {
    this.currentAdminSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentAdmin')));
    this.currentAdmin = this.currentAdminSubject.asObservable();
  }

  public get currentAdminValue(): any {
    return this.currentAdminSubject.value;
  }

  /**
   * Connexion administrateur
   * @param username 
   * @param password 
   * @returns 
   */
   login(username: string, password: string) {
    // Envoie une méthode HTTP post au BACK
    return this.http.post<any>(`${environment.apiUrl}/admin/login`, { username, password }).pipe(map(admin => {
      localStorage.setItem('currentAdmin', JSON.stringify(admin));
      this.currentAdminSubject.next(admin);
      return admin;
    }));
  }

  /**
   * Déconnexion administrateur
   */
   logout() {
    localStorage.removeItem('currentAdmin');
    this.currentAdminSubject.next(null);
  }
}
