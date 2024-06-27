export interface VerifyOtp {
  otp: string;
  mobile_number: string;
}

export interface VerifyOtpResponse {
  code: number;
  message: string;
  data?: {
    id: number;
    name: string;
    email: string;
    image: string | null;
    mobile_number: string;
    token: string;
    created_at: string;
    updated_at: string;
    error?: {
      otp: string[];
      mobile_number: string[];
    };
  };
}

export interface VerifyOtp {
  otp: string;
  mobile_number: string;
}

export interface VerifyOtpResponse {
  code: number;
  message: string;
  data?: {
    id: number;
    name: string;
    email: string;
    image: string | null;
    mobile_number: string;
    token: string;
    created_at: string;
    updated_at: string;
    error?: {
      otp: string[];
      mobile_number: string[];
    };
  };
}

export interface VerifyOtpState {
    id?: number | null;
    otp?: string | null;
    name?: string | null;
    email?: string | null;
    mobile_number?: string | null;
    image?: string | null;
    token: string | null;
    created_at?: string | null;
    updated_at?: string | null;
    errors: {
      otp: string[];
      mobile_number: string[];
    };
  }