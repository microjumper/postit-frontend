import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { MenuItem } from 'primeng/api';

import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth/auth.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  items: MenuItem[];

  user$: Observable<User | null> | undefined;

  constructor(private authService: AuthService) {
    this.items = [];
  }

  ngOnInit(): void {
    this.user$ = this.authService.getUser();

    this.items.push(
      {
        label: 'Logout',
        icon: 'pi pi-fw pi-power-off',
        command: () => this.authService.logout()
      }
    );
  }
}
