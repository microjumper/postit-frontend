import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthService } from '../../services/auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const raw = localStorage.getItem('token');

    if (raw) {
      const token = JSON.parse(raw);
      request = request.clone({setHeaders: {Authorization: `Bearer ${token}`}});
    }

    return next.handle(request).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            console.log('ERROR 401 UNAUTHORIZED');
          }
          return throwError(error);
        })
      );
  }
}
