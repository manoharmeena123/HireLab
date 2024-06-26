// src/modules/register/store/register.slice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RegisterState } from '../types';

const initialState: RegisterState = {
  name: '',
  email: '',
  mobile_number: '',
  errors: {
    name: [],
    email: [],
    mobile_number: [],
  },
};

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    setAuthState: (state, action: PayloadAction<Partial<RegisterState>>) => {
      return { ...state, ...action.payload };
    },
    setErrors: (state, action: PayloadAction<RegisterState['errors']>) => {
      state.errors = action.payload;
    },
    clearErrors: (state) => {
      state.errors = {
        name: [],
        email: [],
        mobile_number: [],
      };
    },
  },
});

export const { setAuthState, setErrors, clearErrors } = registerSlice.actions;
export const registerReducer = registerSlice.reducer;
