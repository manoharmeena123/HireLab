// src/rtk/base-query/index.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { prepareHeaders } from '@/rtk/base-query/helpers/prepare-headers';
import Env from '@/lib/Env';
export const baseQuery = fetchBaseQuery({
  baseUrl: Env.API_URL,
  prepareHeaders,
});

export const hirelabApiSlice = createApi({
  reducerPath: 'mainQuery',
  baseQuery,
  endpoints: () => ({}),
  refetchOnReconnect: true,
});

