import { AuthenticationService } from '../auth/authentication.service';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(private authenticationService: AuthenticationService) { }
    
    /**
     * Intercepte toutes les méthodes HTTP que nous envoyons.
     * Rajoute le TOKEN aux headers des requêtes.
     * @param request 
     * @param next 
     * @returns 
     */
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const currentCaptain = this.authenticationService.currentCaptainValue;
        if (currentCaptain && currentCaptain.token) {
            request = request.clone({
                setHeaders: {
                    token: `${currentCaptain.token}`
                }
            });
        }
        return next.handle(request);
    }
}
