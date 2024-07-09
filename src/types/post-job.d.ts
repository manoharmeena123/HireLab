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
interface MembershipInfo {
  id: number;
  membership_id: number;
  content: string;
  created_at: string;
  updated_at: string;
}

interface Membership {
  id: number;
  title: string;
  description: string;
  price: string;
  created_at: string | null;
  updated_at: string | null;
  status: string;
  discount_price: string;
  info: MembershipInfo[];
}

interface MembershipResponse {
  code: number;
  success: boolean;
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

//ctc
interface CtcData {
  id: number;
  title: string;
  status: string;
  jobs_count: string | number;
  created_at: string;
  updated_at: string;
}

interface CtcApiResponse {
  code: number;
  success: string;
  message: string;
  data: CtcData[];
}

//getTier

interface Tier {
  id: number;
  title: string;
  status: string;
  created_at: string;
  updated_at: string;
}

interface TiersResponse {
  code: number;
  success: boolean;
  message: string;
  data: Tier[];
}

//get designation

interface Designation {
  id: number;
  title: string;
  status: string;
  created_at: string;
  updated_at: string;
}

interface DesignationsResponse {
  code: number;
  success: boolean;
  message: string;
  data: Designation[];
}

//get Setting

interface Setting {
  id: number;
  created_at: string;
  updated_at: string;
  site_name: string;
  footer_description: string | null;
  logo: string | null;
  twitter: string | null;
  facebook: string | null;
  linkedin: string | null;
  instagram: string | null;
  api_key: string | null;
  api_secret: string | null;
  api_key_for_payment: string | null;
  api_secret_for_payment: string | null;
  import_css: string | null;
  import_js: string | null;
  address: string;
  email: string | null;
  number: string | null;
}

interface SettingResponse {
  code: number;
  success: string;
  message: string;
  data: Setting;
}

//get categories

interface Category {
  id: number;
  parent_id: number | null;
  title: string;
  status: string;
  created_at: string;
  updated_at: string;
}

interface CategoriesResponse {
  code: number;
  success: string;
  message: string;
  data: Category[];
}

type WritableAdditionalPerkResponse = WritableDraft<AdditionalPerkResponse>;
type WritableMembershipResponse = WritableDraft<MembershipResponse>;
type WritableLocationResponse = WritableDraft<LocationResponse>;
type WritableTagResponse = WritableDraft<TagResponse>;
type WritableJobTypeResponse = WritableDraft<JobTypeResponse>;
type WritableEducationResponse = WritableDraft<EducationResponse>;
type WritableCompensationResponse = WritableDraft<CompensationResponse>;
type WritableCtcApiResponse = WritableDraft<CtcApiResponse>;
type WritableTiersResponse = WritableDraft<TiersResponse>;
type WritableDesignationsResponse = WritableDraft<DesignationsResponse>;
type WritableSettingResponse = WritableDraft<SettingResponse>;
type WritableCategoriesResponse = WritableDraft<CategoriesResponse>;

// Export all types
export {
  WritableEducationResponse,
  WritableLocationResponse,
  WritableTagResponse,
  WritableJobTypeResponse,
  WritableCompensationResponse,
  WritableMembershipResponse,
  WritableAdditionalPerkResponse,
  WritableCtcApiResponse,
  WritableTiersResponse,
  WritableDesignationsResponse,
  WritableSettingResponse,
  WritableCategoriesResponse,
};
