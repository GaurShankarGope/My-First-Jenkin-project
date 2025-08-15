import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RegisterState } from '../reducers/register.reducer';

export const selectRegisterState = createFeatureSelector<RegisterState>('register');

export const selectRegisterData = createSelector(
  selectRegisterState,
  (state) => state
);
