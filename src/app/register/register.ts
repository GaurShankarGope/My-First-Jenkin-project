import { CommonModule, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as RegisterActions from '../store/actions/register.actions';
import { selectRegisterData } from '../store/selectors/register.selectors';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule,CommonModule,NgClass],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {
  registerForm!: FormGroup;
  submitted=false
  registerData$: any;

  constructor(
    private fb:FormBuilder,
    private store: Store,
    private router:Router
  ) {
    this.registerData$ = this.store.select(selectRegisterData);
    // Log register data for debugging
    this.registerData$.subscribe((data:any) => console.log('Register data from store:', data));
  }
  ngOnInit() {
   this.getRegisterForm()
  }
  // Custom validator for matching password and confirmPassword
  passwordMatchValidator: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  };

  getRegisterForm() {
    this.registerForm = this.fb.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    }, { validators: this.passwordMatchValidator });
  }
  get f(){
    return this.registerForm.controls
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.store.dispatch(RegisterActions.registerUser(this.registerForm.value));
    this.redirectToLogin();
  }
  redirectToLogin(){
    this.router.navigate(['/login'])
  }
}
