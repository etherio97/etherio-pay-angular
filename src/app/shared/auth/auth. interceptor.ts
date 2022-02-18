import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor {
  constructor(private auth: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let newReq = req.clone();

    if (this.auth.getAccessToken()) {
      newReq = req.clone({
        headers: req.headers.set(
          'Authorization',
          'Bearer ' + this.auth.getAccessToken()
        ),
      });
    }

    return next.handle(newReq);
  }
}
