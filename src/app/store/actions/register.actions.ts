import { createAction, props } from '@ngrx/store';

export const registerUser = createAction(
  '[Register] Register User',
  props<{ fname: string; lname: string; email: string; password: string; confirmPassword: string }>()
);

export const registerUserSuccess = createAction(
  '[Register] Register User Success'
);

export const registerUserFailure = createAction(
  '[Register] Register User Failure',
  props<{ error: string }>()
);
