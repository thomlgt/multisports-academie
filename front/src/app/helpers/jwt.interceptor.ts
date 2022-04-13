import { AuthenticationService } from '../auth/authentication.service';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AdminAuthenticationService } from '../admin/admin-authentication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(private authenticationService: AuthenticationService, private adminAuthenticationService: AdminAuthenticationService) { }
    
    /**
     * Intercepte toutes les méthodes HTTP que nous envoyons.
     * Rajoute le TOKEN aux headers des requêtes.
     * @param request 
     * @param next 
     * @returns 
     */
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const currentCaptain = this.authenticationService.currentCaptainValue;
        if (currentCaptain && currentCaptain.access_token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentCaptain.access_token}`
                }
            });
        }
        const currentAdmin = this.adminAuthenticationService.currentAdminValue;
        if (currentAdmin && currentAdmin.access_token) {
            console.log("ok")
            request = request.clone({
                setHeaders: 
                {
                    Authorization: `Bearer ${currentAdmin.access_token}`
                }
            });
        }
        return next.handle(request);
    }
}
