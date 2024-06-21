// src/modules/register/store/register.selectors.ts
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/store';
import { RegisterState } from '../types';

const registerSelector = (state: RootState): RegisterState => state.register;

export const selectRegisterState = createSelector(
  registerSelector,
  (state) => state
);

export const selectRegisterErrors = createSelector(
  registerSelector,
  (state) => state.errors
);
