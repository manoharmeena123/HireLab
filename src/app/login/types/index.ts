// src/app/login/types/index.ts
import { WritableDraft } from "immer";
export interface LoginState {
  loggedInUser: any;
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
export interface VerifyOtp {
  otp: string;
  mobile_number: string;
}

export interface LoginResponse {
  code: number;
  message: string;
  data?: {
    id: number;
    name: string;
    email: string;
    image: string | null;
    mobile_number: string;
    created_at: string;
    updated_at: string;
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

//logout
export interface LogoutResponse {
  code: number;
  success: boolean;
  message: string;
  data: any[];
}

//getlooged user

export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
  role_id: number | null;
  status: string;
  image: string | null;
  mobile_number: string;
  otp: number;
  is_verify: string;
  company_name: string | null;
  website: string | null;
  founded_date: string | null;
  country_id: number | null;
  category_id: number | null;
  city_id: number | null;
  zip: string | null;
  address: string | null;
  facebook: string | null;
  google: string | null;
  twitter: string | null;
  linkedin: string | null;
  experience: string | null;
  industry_id: number | null;
  expected_ctc: string | null;
  current_ctc: string | null;
  resume: string | null;
  location: string | null;
  country: string | null;
  description: string | null;
  city: string | null;
  college_id: number | null;
  current_ctc_id: number | null;
  designation_id: number | null;
}

interface LoggedUserResponse {
  user: User;
  message: string;
  status: string;
}

type WritableLogoutResponse = WritableDraft<LogoutResponse>;
type WritableLoggedUserResponse = WritableDraft<LoggedUserResponse>;

export type { WritableLoggedUserResponse, WritableLogoutResponse };
