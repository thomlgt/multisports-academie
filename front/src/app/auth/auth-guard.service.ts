import { AuthenticationService } from './authentication.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  /**
   * Vérifie que l'utilisateur est connecté.
   * Si l'utilisateur est connecté, renvoie "true" (peut accéder à la page)
   * Sinon renvoie "false" (ne peut pas accéder à la page) et redirige vers la page de connexion
   * @param route 
   * @param state 
   * @returns 
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const currentCaptain = this.authenticationService.currentCaptainValue;
    if (currentCaptain) {
      return true;
    } else {
      this.router.navigate(['']);
      return false;
    }
  }
}
