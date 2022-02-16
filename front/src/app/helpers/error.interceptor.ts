import { AuthenticationService } from '../auth/authentication.service';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private authenticationService: AuthenticationService) { }

    /**
     * Intercepte toutes les requêtes HTTP que nous envoyons.
     * Evite de donner le détail des erreurs dans la console.
     * @param request 
     * @param next 
     * @returns 
     */
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError((err: any) => {
            if (err.status === 401) {
                this.authenticationService.logout();
            }
            const error = err.error.msg || err.statusText;
            return throwError(error);
        }));
    }
}
