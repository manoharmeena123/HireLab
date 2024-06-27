// src/app/send-otp/store/send-otp.selectors.ts
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/store';
import { VerifyOtpState } from '../types';

const verifyOtpSelector = (state: RootState): VerifyOtpState => state.verifyOtp;

export const selectVerifyOtpState = createSelector(
  verifyOtpSelector,
  (verifyOtpState) => ({ ...verifyOtpState })
);

export const selectVerifyOtpErrors = createSelector(
  verifyOtpSelector,
  (verifyOtpState) =>
    Object.fromEntries(
      Object.entries(verifyOtpState.errors).map(([key, value]) => [key, [...value]])
    )
);

export const selectAuthToken = createSelector(
  verifyOtpSelector,
  (verifyOtpState) => verifyOtpState?.token
);
