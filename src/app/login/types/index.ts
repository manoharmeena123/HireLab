// src/app/login/types/index.ts

export interface LoginState {
  id?: number | null;
  name?: string | null;
  email: string;
  mobile_number: string;
  image?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  token: string | null;
  errors: {
    email: string[];
    mobile_number: string[];
  };
}

export interface LoginArgs {
  email: string;
  mobile_number: string;
}

export interface LoginResponse {
  token: string | null;
  code: number;
  data?: {
    id: number;
    name: string;
    email: string;
    image: string | null;
    mobile_number: string;
    created_at: string;
    updated_at: string;
    token: string;
    error?: {
      email: string[];
      mobile_number: string[];
    };
  };
}

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

export interface SignInResult {
  redirect: boolean;
  email: string;
  mobile_number: string;
}
