// src/modules/register/types/index.ts
export interface RegisterState {
    name: string;
    email: string;
    mobile_number: string;
    errors: {
      name: string[];
      email: string[];
      mobile_number: string[];
    };
  }
  
  export interface RegisterResponse {
    code: number;
    data?: {
      error: {
        name: string[];
        email: string[];
        mobile_number: string[];
      };
    };
  }
  
  export type RegisterArgs = {
    name: string;
    email: string;
    mobile_number: string;
  };
  
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
  