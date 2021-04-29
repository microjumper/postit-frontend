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

  login(user: User): Observable<User> {
    return this.httpClient.post<User>('http://localhost:3000/', user).pipe(
      tap(response => {
        localStorage.setItem('user', JSON.stringify(response));
        this.userBehaviorSubject.next(response);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('user');
    this.userBehaviorSubject.next(null);
  }
}
