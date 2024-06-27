// src/app/send-otp/store/send-otp.api.ts
import { VerifyOtp } from "../types";

export const queries = {
  verifyOtp: {
    query: (credentials: VerifyOtp) => ({
      url: "api/verify-otp",
      method: "POST",
      body: credentials,
    }),
  },
};
