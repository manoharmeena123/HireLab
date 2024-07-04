import { WritableDraft } from "immer";

// export interface ProfileData {
//   name: string | null;
//   email: string;
//   email_verified_at: string | null;
//   created_at: string;
//   updated_at: string;
//   role_id: number | null;
//   status: string;
//   image: string | null;
//   mobile_number: string | null;
//   otp: number;
//   is_verify: string;
//   website: string | null;
//   founded_date: string | null;
//   country_id: number | null;
//   category_id: string | null;
//   city_id: number | null;
//   zip: string | null;
//   address: string | null;
//   facebook: string | null;
//   google: string | null;
//   twitter: string | null;
//   linkedin: string | null;
//   experience: string | null;
//   industry_id: number | null;
//   expected_ctc: number | null;
//   current_ctc: number | null;
//   resume: string | null;
//   location: string | null;
//   country: string | null;
//   description: string | null;
//   city: string | null;
//   college_id: number | null;
//   current_ctc_id: number | null;
//   designation_id: number | null;
// }

export interface ProfileData {
  name: string | null;
  email: string | null;
  website: string | null;
  founded_date: string | null;
  category_id: string | null;
  country: string | null;
  description: string | null;
  mobile_number: string;
  city: string | null;
  zip: string | null;
  address: string | null;
  facebook: string | null;
  twitter:string | null;
  google: string | null;
  linkedin: string | null;
}

type WritableProfileData = WritableDraft<ProfileData>;

export type {
    WritableProfileData
}

