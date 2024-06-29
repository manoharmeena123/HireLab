// src/app/manage-jobs/store/manage-job.selectors.ts

import { RootState } from '@/store';
import { JobData } from '../types';

// Selector to get all manage jobs
export const selectManageJobs = (state: RootState): JobData[] => state.manageJob.jobs;

// Selector to get a manage job by its ID
export const selectManageJobById = (state: RootState, jobId: number): JobData | undefined =>
  state.manageJob.jobs.find((job) => job.id === jobId);

// Selector to get the loading state of manage jobs
export const selectManageJobLoading = (state: RootState): boolean => state.manageJob.loading;

// Selector to get the error state of manage jobs
export const selectManageJobError = (state: RootState): string | null => state.manageJob.error;
