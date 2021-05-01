// @ts-ignore

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginFormActive: boolean;

  loginForm: FormGroup;
  registrationForm: FormGroup;

  private returnUrl: string;

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) {
    this.loginFormActive = true;

    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });

    this.registrationForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      conferma: new FormControl('', [Validators.required, this.passwordMatching.bind(this)]),
    });

    this.returnUrl = '';
  }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  onLogin(): void {
    this.authService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe(
      (user) => this.router.navigate([this.returnUrl]).then(),
      (error: Error) => console.log(error.name, error.message));
  }

  onRegistration(): void {
    this.authService.register(this.registrationForm.value.username, this.registrationForm.value.password).subscribe(
      (user) => this.router.navigate([this.returnUrl]).then(),
      (error: Error) => console.log(error.name, error.message));
  }

  private passwordMatching(control: FormControl): ValidationErrors | null  {
    if (control.value === this.registrationForm?.get('password')?.value) {
      return null;
    }

    return {invalid: true};
  }
}
