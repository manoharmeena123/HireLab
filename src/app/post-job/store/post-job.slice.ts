// src/app/post-job/store/post-job.slice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PostJobState } from '../types';

const initialState: PostJobState = {
  company_name: '',
  job_title: '',
  job_type: '',
  experience: '',
  location: '',
  address: '',
  compensation: '',
  additional_perk: '',
  joining_fee: '',
  candidate_requirement: '',
  maximum_education: '',
  total_experience: '',
  job_description: '',
  errors: {},
  salary: '',
  tags: '',
  ctc :''
};

const postJobSlice = createSlice({
  name: 'postJob',
  initialState,
  reducers: {
    setPostJobData: (state, action: PayloadAction<Partial<PostJobState>>) => {
      return { ...state, ...action.payload };
    },
    setPostJobErrors: (state, action: PayloadAction<PostJobState['errors']>) => {
      state.errors = action.payload;
    },
  },
});

export const { setPostJobData, setPostJobErrors } = postJobSlice.actions;
export const postJobReducer = postJobSlice.reducer;
