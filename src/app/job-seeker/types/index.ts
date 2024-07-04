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
  resume: File | string | null;
  location: string | null;
  industry: string | null;
  image:File | string | null;
}

type WritableProfileFormData = WritableDraft<ProfileFormData>;

export type { WritableProfileFormData };
