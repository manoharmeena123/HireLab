// src/app/login/store/login.selectors.ts
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/store';
import { LoginState } from '../types';

const loginSelector = (state: RootState): LoginState => state.login;

export const selectLoginState = createSelector(
  loginSelector,
  (state) => state
);

export const selectLoginErrors = createSelector(
  loginSelector,
  (state) => state.errors
);
