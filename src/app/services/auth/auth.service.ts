import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import jwt_decode from 'jwt-decode';

import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userBehaviorSubject = new BehaviorSubject<User | null>(null);

  constructor(private httpClient: HttpClient, private router: Router) {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwt_decode(token) as any;
      const user: User = {id: decoded.id, username: decoded.username};
      this.userBehaviorSubject.next(user);
    }
  }

  getUser(): Observable<User | null> {
    return this.userBehaviorSubject.asObservable();
  }

  login(username: string, password: string): Observable<User | null> {
    return this.httpClient.post<string>('http://localhost:3000/login', {username, password}).pipe(
      map(token => {
        const decoded = jwt_decode(token) as any;
        const user: User = {id: decoded.id, username: decoded.username};
        if (user) {
          localStorage.setItem('token', token);
          this.userBehaviorSubject.next(user);
          return user;
        }
        return null;
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.userBehaviorSubject.next(null);
    this.router.navigate(['login']).then();
  }
}
