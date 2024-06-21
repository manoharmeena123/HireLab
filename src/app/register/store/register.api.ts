// src/modules/register/api/register.api.ts
import { RegisterArgs } from '../types';

export const queries = {
  register: {
    query: (credentials: RegisterArgs) => ({
      url: 'register',
      method: 'POST',
      body: credentials,
    }),
  },
};
