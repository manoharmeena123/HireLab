// src/app/login/types/index.ts

export interface LoginState {
    email: string;
    mobile_number: string;
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
      error: {
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
  