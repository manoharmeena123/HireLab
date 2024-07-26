// src/types/index.ts
export interface BannerData {
  heading: string;
  description: string;
}

export interface BannerResponse {
  data: BannerData;
}

export interface BannerState {
  banner: BannerData | null;
  loading: boolean;
  error: string | null;
}
