import { hirelabApiSlice } from "@/rtk/base-query";
import { queries } from "./login.api";
import { setAuthToken, setAuthState } from "./login.slice";
import { LoginArgs, LoginResponse, WritableLoggedUserResponse,WritableLogoutResponse } from "../types";

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
    getlogout: builder.query<WritableLogoutResponse, void>({
      query: queries.getlogout.query,
      providesTags: ["LogOut"],
    }),
    getLoggedInUser: builder.query<WritableLoggedUserResponse, void>({
      query: queries.getLoggedInUser.query,
      providesTags: ["LoggedInUser"],
    }),
  }),
});

export const { useLoginMutation, useGetlogoutQuery,useGetLoggedInUserQuery } = loginApiSlice;
export default loginApiSlice;
