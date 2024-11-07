// src/modules/register/store/register.api.ts
import { RegisterArgs } from '../types';

export const queries = {
  register: {
    query: (credentials: RegisterArgs) => ({
      url: 'api/signup',
      method: 'POST',
      body: credentials,
    }),
  },
};
