// src/app/login/store/login.slice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoginState, User } from '../types';

const initialState: LoginState = {
  email: '',
  mobile_number: '',
  token: null,
  loggedInUser: null,
  errors: {
    email: [],
    mobile_number: [],
  },
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setAuthState: (state, action: PayloadAction<Partial<LoginState>>) => {
      return { ...state, ...action.payload };
    },
    setErrors: (state, action: PayloadAction<LoginState['errors']>) => {
      state.errors = action.payload;
    },
    setAuthToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setLoggedInUser: (state, action: PayloadAction<User>) => {
      state.loggedInUser = action.payload;
    },
    resetLoginState: () => initialState, 
  },
});

export const { setAuthState, setErrors, setAuthToken, setLoggedInUser, resetLoginState } = loginSlice.actions;
export const loginReducer = loginSlice.reducer;
