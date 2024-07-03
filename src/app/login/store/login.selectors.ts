// src/app/login/store/selectors.ts
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

export const selectAuthToken = createSelector(
  loginSelector,
  (loginState) => loginState.token // Selector to get the auth token
);

export const selectUserEmail = createSelector(
  loginSelector,
  (loginState) => loginState.email // Selector to get the user email
);

export const selectUserMobileNumber = createSelector(
  loginSelector,
  (loginState) => loginState.mobile_number // Selector to get the user mobile number
);

export const selectLoggedInUser = createSelector(
  loginSelector,
  (loginState) => loginState.loggedInUser // Selector to get the logged-in user data
);
