import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '../../services/auth/auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userForm: FormGroup;

  private returnUrl: string;

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) {
    this.userForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });

    this.returnUrl = '';
  }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  onSubmit(): void {
    this.authService.login(this.userForm.value.username, this.userForm.value.password).subscribe(
      (response: User) => {
        this.router.navigate([this.returnUrl]).then();
        },
      (error: Error) => console.log(error.name, error.message));
  }
}
