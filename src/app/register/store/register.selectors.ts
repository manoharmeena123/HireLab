// src/modules/register/store/register.selectors.ts
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/store';
import { RegisterState } from '../types';

const registerSelector = (state: RootState): RegisterState => state.register;

export const selectRegisterState = createSelector(
  registerSelector,
  (registerState) => ({ ...registerState }) // Ensure transformation by creating a new object
);

export const selectRegisterErrors = createSelector(
  registerSelector,
  (registerState) => 
    Object.fromEntries(
      Object.entries(registerState.errors).map(([key, value]) => [key, [...value]])
    ) // Ensure transformation by creating a new object with new arrays
);
