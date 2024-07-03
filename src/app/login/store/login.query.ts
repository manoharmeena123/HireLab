// src/app/login/store/login.api.ts
import { hirelabApiSlice } from "@/rtk/base-query";
import { queries } from "./login.api";
import { setAuthToken, setAuthState, setLoggedInUser, resetLoginState } from "./login.slice";
import { LoginArgs, LoginResponse, WritableLoggedUserResponse, WritableLogoutResponse } from "../types";

const hirelabEnhancedSlice = hirelabApiSlice.enhanceEndpoints({
  addTagTypes: ["Login", "LogOut", "LoggedInUser"],
});

const loginApiSlice = hirelabEnhancedSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginArgs>({
      query: (credentials) => queries.login.query(credentials),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log("logindata", data);
        } catch (error) {
          console.error("Login failed:", error);
        }
      },
      invalidatesTags: ["Login"],
    }),
    logout: builder.mutation<WritableLogoutResponse, void>({
      query: queries.getlogout.query,
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(resetLoginState());
        } catch (error) {
          console.error("Logout failed:", error);
        }
      },
      invalidatesTags: ["LogOut"],
    }),
    getLoggedInUser: builder.query<WritableLoggedUserResponse, void>({
      query: queries.getLoggedInUser.query,
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setLoggedInUser(data.user));
        } catch (error) {
          console.error("Fetching logged-in user failed:", error);
        }
      },
      providesTags: ["LoggedInUser"],
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useGetLoggedInUserQuery } = loginApiSlice;
export default loginApiSlice;
