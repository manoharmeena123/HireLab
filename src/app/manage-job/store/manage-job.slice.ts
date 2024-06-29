// src/app/manage-jobs/store/manage-job.slice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { JobData } from '../types';

interface ManageJobState {
  jobs: JobData[];
  loading: boolean;
  error: string | null;
}

const initialState: ManageJobState = {
  jobs: [],
  loading: false,
  error: null,
};

const manageJobSlice = createSlice({
  name: 'manageJob',
  initialState,
  reducers: {
    setManageJobs: (state, action: PayloadAction<JobData[]>) => {
      state.jobs = action.payload;
    },
    addManageJob: (state, action: PayloadAction<JobData>) => {
      state.jobs.push(action.payload);
    },
    updateManageJob: (state, action: PayloadAction<{ id: number; data: Partial<JobData> }>) => {
      const index = state.jobs.findIndex((job) => job.id === action.payload.id);
      if (index !== -1) {
        state.jobs[index] = { ...state.jobs[index], ...action.payload.data };
      }
    },
    deleteManageJob: (state, action: PayloadAction<number>) => {
      state.jobs = state.jobs.filter((job) => job.id !== action.payload);
    },
    setManageJobLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setManageJobError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setManageJobs,
  addManageJob,
  updateManageJob,
  deleteManageJob,
  setManageJobLoading,
  setManageJobError,
} = manageJobSlice.actions;

export const manageJobReducer = manageJobSlice.reducer;
