// src/app/login/store/login.api.ts
import { LoginArgs } from '../types';

export const queries = {
  login: {
    query: (credentials: LoginArgs) => ({
      url: 'api/login',
      method: 'POST',
      body: credentials,
    }),
  },
};
