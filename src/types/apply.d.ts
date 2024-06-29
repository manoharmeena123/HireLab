



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
}

export type ApplyJobData ={
    job_id :string
}