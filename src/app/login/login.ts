import { CommonModule, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import * as LoginActions from '../store/actions/login.actions'
import { Store } from '@ngrx/store';
import { Route, Router } from '@angular/router';
import { selectRegisterData } from '../store/selectors/register.selectors';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, NgClass,CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  standalone: true,
})
export class Login {
  loginForm!: FormGroup;
  submitted=false
  registerData: any;

  constructor(
    private fb:FormBuilder,
    private store: Store,
    private router: Router
  ) {
    this.store.select(selectRegisterData).subscribe(data => {
      this.registerData = data;
    });
  }
  ngOnInit() {
   this.getLoginForm()
  }
  getLoginForm() {
  this.loginForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  })
  }
  get f(){
    return this.loginForm.controls
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    // Check if email and password match registered values
    if (
      this.registerData &&
      email === this.registerData.email &&
      password === this.registerData.password
    ) {
      this.store.dispatch(LoginActions.loginUser({ email, password }));
      this.router.navigate(['/dashboard']);
    } else {
      alert('Invalid email or password!');
    }
  }
  redirectToRegister(){
    this.router.navigate(['/register'])
  }
}
