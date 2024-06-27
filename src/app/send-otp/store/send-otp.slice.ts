// src/app/send-otp/store/send-otp.slice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { VerifyOtpResponse, VerifyOtpState } from "../types";

const initialState: VerifyOtpState = {
  id: null,
  otp: null,
  name: null,
  email: null,
  mobile_number: null,
  image: null,
  token: null,
  created_at: null,
  updated_at: null,
  errors: {
    otp: [],
    mobile_number: [],
  },
};

const verifyOtpSlice = createSlice({
  name: "verifyOtp",
  initialState,
  reducers: {
    setVerifyOtpState: (
      state,
      action: PayloadAction<Partial<VerifyOtpState>>
    ) => {
      return { ...state, ...action.payload };
    },
    setVerifyOtpErrors: (
      state,
      action: PayloadAction<VerifyOtpState["errors"]>
    ) => {
      state.errors = action.payload;
    },
    setAuthToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    clearVerifyOtpState: (state) => {
      state.id = null;
      state.otp = null;
      state.name = null;
      state.email = null;
      state.mobile_number = null;
      state.image = null;
      state.token = null;
      state.created_at = null;
      state.updated_at = null;
      state.errors = {
        otp: [],
        mobile_number: [],
      };
    },
  },
});

export const {
  setVerifyOtpState,
  setVerifyOtpErrors,
  setAuthToken,
  clearVerifyOtpState,
} = verifyOtpSlice.actions;
export const verifyOtpReducer = verifyOtpSlice.reducer;
