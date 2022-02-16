import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CreateCaptain } from '../models/captain/createCaptain';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentCaptainSubject: BehaviorSubject<any>;
  public currentCaptain: Observable<any>;
  isConnect: boolean;

  constructor(private router: Router, private http: HttpClient) {
    this.currentCaptainSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentCaptain')));
    this.currentCaptain = this.currentCaptainSubject.asObservable();

    // Fait référence au getter
    if (this.currentCaptainValue) {
      this.isConnect = true;
    } else {
      this.isConnect = false;
    }
  }

  public get currentCaptainValue(): any {
    return this.currentCaptainSubject.value;
  }

  /**
   * Connexion utilisateur
   * @param email 
   * @param password 
   * @returns 
   */
  login(email: string, password: string) {
    // Envoie une méthode HTTP post au BACK
    return this.http.post<any>(`http://localhost:3000/auth/login`, { email, password }).pipe(map(captain => {
      localStorage.setItem('currentCaptain', JSON.stringify(captain));
      this.currentCaptainSubject.next(captain);
      this.isConnect = true;
      return captain;
    }));
  }

  /**
   * Inscription utilisateur
   * @param captain
   * @returns 
   */
   register(captain : CreateCaptain) {
    // Envoie une méthode HTTP post au BACK
    return this.http.post<any>(`http://localhost:3000/auth/register`, captain).pipe(map(captain => {
      localStorage.setItem('currentCaptain', JSON.stringify(captain));
      this.currentCaptainSubject.next(captain);
      this.isConnect = true;
      return captain;
    }));
  }

  /**
   * Déconnexion utilisateur
   */
  logout() {
    localStorage.removeItem('currentCaptain');
    this.currentCaptainSubject.next(null);
    this.isConnect = false;
  }
}
