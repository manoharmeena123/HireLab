import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/store';
import { LoginState } from '../types';

const loginSelector = (state: RootState): LoginState => state.login;

export const selectLoginState = createSelector(
  loginSelector,
  (loginState) => ({ ...loginState }) // Ensure transformation by creating a new object
);

export const selectLoginErrors = createSelector(
  loginSelector,
  (loginState) => 
    Object.fromEntries(
      Object.entries(loginState.errors).map(([key, value]) => [key, [...value]])
    ) // Ensure transformation by creating a new object with new arrays
);
