import { WritableDraft } from "immer";

interface Experience {
    id: number;
    title: string;
    status: string;
    created_at: string;
    updated_at: string;
}

interface Location {
    id: number;
    title: string;
    status: string;
    created_at: string;
    updated_at: string;
}

interface Compensation {
    id: number;
    title: string;
    status: string;
    created_at: string;
    updated_at: string;
}

interface AdditionalPerk {
    id: number;
    title: string;
    status: string;
    created_at: string;
    updated_at: string;
}

interface Education {
    id: number;
    name: string;
    status: string;
    created_at: string;
    updated_at: string;
}

interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    role_id: string | null;
    status: string;
    image: string | null;
    mobile_number: string;
    otp: number;
    is_verify: string;
    company_name: string | null;
    website: string | null;
    founded_date: string | null;
    country_id: string | null;
    category_id: string | null;
    city_id: string | null;
    zip: string | null;
    address: string | null;
    facebook: string | null;
    google: string | null;
    twitter: string | null;
    linkedin: string | null;
    experience: string | null;
    industry_id: string | null;
    expected_ctc: string | null;
    current_ctc: string | null;
    resume: string | null;
    location: string | null;
    country: string | null;
    description: string | null;
    city: string | null;

}

// Represents an individual job entry
export interface RecentJobData {
    id: number;
    company_name: string;
    job_type: string | null;
    job_category: string | null;
    experience: Experience;
    job_description: string;
    location: Location;
    created_at: string;
    updated_at: string;
    user_id: number;
    job_title: string;
    address: string | null;
    compensation: Compensation;
    additional_perk: AdditionalPerk | null;
    joining_fee: string;
    candidate_requirement: string;
    maximum_education: string;
    total_experience: string;
    education: Education | null;
    user: User | null;
    tags: string
    salary:string
}

// Represents the response from the API
interface RecentJobResponse {
    code: number;
    success: boolean;
    message: string;
    data: RecentJobData[];
}


// getFilter job
export interface Filters {
    job_title: string;
    city: string;
    sector: string;
    [key: string]: string; // Index signature for string properties
  }
  
// Define a writable version of RecentJobResponse using WritableDraft
export type WritableRecentJobResponse = WritableDraft<RecentJobResponse>;
