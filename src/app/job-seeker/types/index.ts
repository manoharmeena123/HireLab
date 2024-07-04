import { WritableDraft } from "immer";

export interface ProfileFormData {
  name: string | null;
  email: string | null;
  mobile_number: string | null;
  college: string | null;
  designation: string | null;
  company_name: string | null;
  experience: string | null;
  country: string | null;
  expected_ctc: string | null;
  resume: File | null;
  location: string | null;
  industry: string | null;
  image: File | null;
}

type WritableProfileFormData = WritableDraft<ProfileFormData>;

export type { WritableProfileFormData };
