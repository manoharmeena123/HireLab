// src/modules/register/store/register.selectors.ts
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/store';
import { RegisterState } from '../types';

const registerSelector = (state: RootState): RegisterState => state.register;

export const selectRegisterState = createSelector(
  registerSelector,
  (registerState) => ({ ...registerState })
);

export const selectRegisterErrors = createSelector(
  registerSelector,
  (registerState) =>
    Object.fromEntries(
      Object.entries(registerState.errors).map(([key, value]) => [key, [...value]])
    )
);

// Selector to extract and save specific data from the register state
export const saveRegisterData = createSelector(
  registerSelector,
  (registerState) => ({
    name: registerState.name,
    email: registerState.email,
    mobile_number: registerState.mobile_number,
  })
);
