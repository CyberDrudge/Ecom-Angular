import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';


@Injectable()
export class TokenService implements HttpInterceptor {
    constructor(private authService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        const currentUser = this.authService.authUser();
        const token = this.authService.getToken();
        if (currentUser && token) {
            request = request.clone({
              headers: request.headers.set('Authorization', /* here you fetch your jwt */`Bearer ${token}`)
            });
        }
        return next.handle(request);
    }
}
