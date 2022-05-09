import { AuthenticationService } from '../auth/authentication.service';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginModalComponent } from '../modules/ms-ui/components/login-modal/login-modal.component';
import { AdminAuthenticationService } from '../admin/admin-authentication.service';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(
        private authenticationService: AuthenticationService,
        private adminAuthenticationService: AdminAuthenticationService,
        private modalService: NgbModal,
        private router: Router) { }

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
                this.modalService.dismissAll();
                if(this.adminAuthenticationService.currentAdminValue) {
                    this.adminAuthenticationService.logout();
                } else if(this.authenticationService.currentCaptainValue) {
                    this.authenticationService.logout();
                    this.router.navigateByUrl("/home")
                    setTimeout(() => {
                        const modalRef = this.modalService.open(LoginModalComponent, { centered: true, size: 'xl'});
                    }, 100);
                    
                }
                
            }
            const error = err.error.msg || err.statusText;
            return throwError(error);
        }));
    }
}
