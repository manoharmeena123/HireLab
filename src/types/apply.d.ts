import { WritableDraft } from "immer";
interface ApplyJobResponse {
  code: number;
  success: boolean;
  message: string;
  data: any[];
}

export type ApplyJobState = {
  applyJob: ApplyJobResponse[];
  applyJobLoading: boolean;
  applyJobError: string | null;
};

export type ApplyJobData = {
  job_id: string;
};

export type SaveJobData = {
  job_id: string;
};

interface SaveJobDataResponse {
  code: number;
  success: boolean;
  message: string;
  data: any[];
}

export type SaveJobDataState = {
  saveJob: SaveJobDataResponse[];
  saveJobLoading: boolean;
  saveJobError: string | null;
};




// get

interface GetSaveJobData {
    id: number;
    company_name: string;
    job_type: string | null;
    job_category: string | null;
    experience: {
      id: number;
      title: string;
      status: string;
      created_at: string;
      updated_at: string;
    };
    job_description: string;
    location: {
      id: number;
      title: string;
      status: string;
      created_at: string;
      updated_at: string;
    };
    created_at: string;
    updated_at: string;
    user_id: number;
    job_title: string;
    address: string;
    compensation: {
      id: number;
      title: string;
      status: string;
      created_at: string;
      updated_at: string;
    };
    additional_perk: {
      id: number;
      title: string;
      status: string;
      created_at: string;
      updated_at: string;
    };
    joining_fee: string;
    candidate_requirement: string;
    maximum_education: string;
    total_experience: string;
    education: null; // Assuming education is nullable
    user: null; // Assuming user is nullable
  }
  
  export interface GetSaveJobResponse {
    code: number;
    success: boolean;
    message: string;
    data: JobData[];
  }
  
  export type WritableGetSaveJobResponse = WritableDraft<GetSaveJobResponse>;