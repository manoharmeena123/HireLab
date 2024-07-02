import { WritableDraft } from "immer";

// Define the interface for individual education data
interface Education {
  id: number;
  name: string;
  status: string;
  created_at: string;
  updated_at: string;
}

// Define the interface for the education API response
interface EducationResponse {
  code: number;
  success: string;
  message: string;
  data: Education[];
}

// Define the interface for individual location data
interface Location {
  id: number;
  title: string;
  status: string;
  created_at: string;
  updated_at: string;
}

// Define the interface for the location API response
interface LocationResponse {
  code: number;
  success: string;
  message: string;
  data: Location[];
}

// Define the interface for individual tag data
interface Tag {
  id: number;
  title: string;
  status: string;
  created_at: string;
  updated_at: string;
}

// Define the interface for the tag API response
interface TagResponse {
  code: number;
  success: string;
  message: string;
  data: Tag[];
}

// Define the interface for individual job type data
interface JobType {
  id: number;
  title: string;
  status: string;
  created_at: string;
  updated_at: string;
}

// Define the interface for the job type API response
interface JobTypeResponse {
  code: number;
  success: string;
  message: string;
  data: JobType[];
}

// Define the interface for individual compensation data
interface Compensation {
  id: number;
  title: string;
  status: string;
  created_at: string;
  updated_at: string;
}

// Define the interface for the compensation API response
interface CompensationResponse {
  code: number;
  success: string;
  message: string;
  data: Compensation[];
}

// Define the interface for individual membership data
interface Membership {
  id: number;
  title: string;
  description: string;
  price: string;
  created_at: string | null;
  updated_at: string | null;
  status: string;
}

// Define the interface for the membership API response
interface MembershipResponse {
  code: number;
  success: string;
  message: string;
  data: Membership[];
}
// Define the interface for individual additional perks data
interface AdditionalPerk {
  id: number;
  title: string;
  status: string;
  created_at: string;
  updated_at: string;
}

// Define the interface for the additional perks API response
interface AdditionalPerkResponse {
  code: number;
  success: string;
  message: string;
  data: AdditionalPerk[];
}


type WritableAdditionalPerkResponse = WritableDraft<AdditionalPerkResponse>;
type WritableMembershipResponse = WritableDraft<MembershipResponse>;
type WritableLocationResponse = WritableDraft<LocationResponse>;
type WritableTagResponse = WritableDraft<TagResponse>;
type WritableJobTypeResponse = WritableDraft<JobTypeResponse>;
type WritableEducationResponse = WritableDraft<EducationResponse>;
type WritableCompensationResponse = WritableDraft<CompensationResponse>;

// Export all types
export {
  WritableEducationResponse,
  WritableLocationResponse,
  WritableTagResponse,
  WritableJobTypeResponse,
  WritableCompensationResponse,
  WritableMembershipResponse,
  WritableAdditionalPerkResponse
};
