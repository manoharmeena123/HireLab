// src/modules/auth/types/index.ts
import { User as NextAuthUser } from 'next-auth';

export interface CustomUser {
  user: {
    data: {
      id?: string | null;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      created_at?: string | null;
      updated_at?: string | null;
    };
  };
}

export interface CustomSession {
  user?: CustomUser;
  expires: string;
}

export interface LoginRequest {
  email: string;
  mobile_number: string;
}

export interface LoginResponse {
  user: CustomUser;
  token: string;
}
