import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoginState } from '../types';

const initialState: LoginState = {
  email: '',
  mobile_number: '',
  token: null,
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
  },
});

export const { setAuthState, setErrors, setAuthToken } = loginSlice.actions;
export const loginReducer = loginSlice.reducer;
