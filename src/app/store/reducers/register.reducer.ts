import { createReducer, on } from '@ngrx/store';
import * as RegisterActions from '../actions/register.actions';

export interface RegisterState {
  fname: string;
  lname: string;
  email: string;
  password: string;
  confirmPassword: string;
  loading: boolean;
  error: string | null;
  success: boolean;
}

export const initialState: RegisterState = {
  fname: '',
  lname: '',
  email: '',
  password: '',
  confirmPassword: '',
  loading: false,
  error: null,
  success: false
};

export const registerReducer = createReducer(
  initialState,
  on(RegisterActions.registerUser, (state, payload) => ({
    ...state,
    ...payload,
    loading: true,
    error: null,
    success: false
  })),
  on(RegisterActions.registerUserSuccess, (state) => ({
    ...state,
    loading: false,
    error: null,
    success: true
  })),
  on(RegisterActions.registerUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    success: false
  }))
);
