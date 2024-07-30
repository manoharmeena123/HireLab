// src/types/get-setting.d.ts
export interface Setting {
  id: number;
  created_at: string;
  updated_at: string;
  site_name: string;
  footer_description: string;
  logo: string;
  twitter: string | null;
  facebook: string | null;
  linkedin: string | null;
  instagram: string | null;
  address: string;
  email: string;
  number: string | null;
}

export interface SettingResponse {
  code: number;
  success: boolean;
  message: string;
  data: Setting;
}

export interface SettingState {
  setting: Setting | null;
  loading: boolean;
  error: string | null;
}

