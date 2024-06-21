import { hirelabApiSlice } from '@/rtk/base-query';
import { queries } from './login.api';
import { LoginArgs, LoginResponse } from '../types';
import { setAuthToken } from './login.slice';

const hirelabEnhancedSlice = hirelabApiSlice.enhanceEndpoints({
  addTagTypes: ['Login'],
});

const loginApiSlice = hirelabEnhancedSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginArgs>({
      query: (credentials) => queries.login.query(credentials),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.token) {
            dispatch(setAuthToken(data.token));
          }
        } catch (error) {
          console.error('Login failed:', error);
        }
      },
      invalidatesTags: ['Login'],
    }),
  }),
});

export const { useLoginMutation } = loginApiSlice;
export default loginApiSlice;
