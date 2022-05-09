import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AdminAuthenticationService } from './admin-authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate {

  constructor(private authenticationAdminService: AdminAuthenticationService, private router: Router) { }

  /**
   * Vérifie que l'administrateur est connecté.
   * Si l'administrateur est connecté, renvoie "true" (peut accéder à la page)
   * Sinon renvoie "false" (ne peut pas accéder à la page) et redirige vers la page de connexion
   * @param route 
   * @param state 
   * @returns 
   */
   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const currentAdmin = this.authenticationAdminService.currentAdminValue;
    if (currentAdmin) {
      return true;
    } else {
      this.router.navigate(['/admin/login']);
      return false;
    }
  }
}
