import { createReducer, on } from '@ngrx/store';
import * as LoginActions from '../actions/login.actions';

export interface LoginState {
  email: string;
  password: string;
  loading: boolean;
  error: any;
  token: string | null;
  user: any | null;
}

export const initialState: LoginState = {
  email: '',
  password: '',
  loading: false,
  error: null,
  token: null,
  user: null
};

export const loginReducer = createReducer(
  initialState,

  // Login started
  on(LoginActions.loginUser, (state, { email, password }) => ({
    ...state,
    email,
    password,
    loading: true,
    error: null
  })),

  // Login success
  on(LoginActions.loginUserSuccess, (state, { token, user }) => ({
    ...state,
    loading: false,
    token,
    user
  })),

  // Login failure
  on(LoginActions.loginUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);
