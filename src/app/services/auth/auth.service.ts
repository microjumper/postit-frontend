import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { User } from '../../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userBehaviorSubject: BehaviorSubject<User | null>;

  constructor(private httpClient: HttpClient) {
    const raw = localStorage.getItem('user');
    this.userBehaviorSubject = new BehaviorSubject<User | null>(raw ? JSON.parse(raw) : null);
  }

  getUser(): Observable<User | null> {
    return this.userBehaviorSubject.asObservable();
  }

  login(username: string, password: string): Observable<User> {
    return this.httpClient.post<User>('http://localhost:3000/login', {username, password}).pipe(
      tap(user => {
        localStorage.setItem('token', JSON.stringify(user.token));
        this.userBehaviorSubject.next(user);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.userBehaviorSubject.next(null);
  }
}
