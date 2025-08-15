import { createAction, props } from '@ngrx/store';

// Trigger login
export const loginUser = createAction(
  '[Login] Login User',
  props<{ email: string; password: string }>()
);

// On success
export const loginUserSuccess = createAction(
  '[Login] Login User Success',
  props<{ token: string; user: any }>()
);

// On failure
export const loginUserFailure = createAction(
  '[Login] Login User Failure',
  props<{ error: any }>()
);
