import { hirelabApiSlice } from "@/rtk/base-query";
import { queries } from "./send-otp.api";
import { setAuthToken } from "./send-otp.slice";
import { VerifyOtpResponse, VerifyOtp } from "../types";

const hirelabEnhancedSlice = hirelabApiSlice.enhanceEndpoints({
  addTagTypes: ["VerifyOtp"],
});

const VerifyOtpApiSlice = hirelabEnhancedSlice.injectEndpoints({
  endpoints: (builder) => ({
    verifyOtp: builder.mutation<VerifyOtpResponse, VerifyOtp>({
      query: (credentials) => queries.verifyOtp.query(credentials),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log("verifyOtp data", data);
          if (data?.data?.token) {
            dispatch(setAuthToken(data.data.token));
          }
        } catch (error) {
          console.error("Verify OTP failed:", error);
        }
      },
      invalidatesTags: ["VerifyOtp"],
    }),
  }),
});

export const { useVerifyOtpMutation } = VerifyOtpApiSlice;
export default VerifyOtpApiSlice;
