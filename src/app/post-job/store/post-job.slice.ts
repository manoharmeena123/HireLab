import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PostJobState, UpdatePostJobType } from "../types";

const initialPostJobState: PostJobState = {
  company_name: "",
  job_title: "",
  job_type: "",
  experience: "",
  location: "",
  address: "",
  compensation: "",
  additional_perk: "",
  joining_fee: "",
  candidate_requirement: "",
  maximum_education: "",
  total_experience: "",
  job_description: "",
  errors: {},
  city: "",
  state:"",
  tags: "",
  ctc: "",
  sector: "",
};

const initialUpdateJobState: UpdatePostJobType = {
  id: "",
  company_name: "",
  job_title: "",
  job_type: "",
  experience: {
    id: "",
  },
  location: "",
  address: "",
  compensation: "",
  additional_perk: "",
  joining_fee: "",
  candidate_requirement: "",
  maximum_education: "",
  total_experience: "",
  job_description: "",
  errors: {},
  city: "",
  state:"",  
  tags: "",
  ctc: "",
  sector: "",
};

const initialState = {
  postJob: initialPostJobState,
  updateJob: initialUpdateJobState,
};

const postJobSlice = createSlice({
  name: "postJob",
  initialState,
  reducers: {
    setPostJobData: (state, action: PayloadAction<Partial<PostJobState>>) => {
      state.postJob = { ...state.postJob, ...action.payload };
    },
    setPostJobErrors: (
      state,
      action: PayloadAction<PostJobState["errors"]>
    ) => {
      state.postJob.errors = action.payload;
    },
    resetPostJobData: (state) => {
      state.postJob = initialPostJobState;
    },
    setUpdateJobData: (
      state,
      action: PayloadAction<Partial<UpdatePostJobType>>
    ) => {
      state.updateJob = { ...state.updateJob, ...action.payload };
    },
    setUpdateJobErrors: (
      state,
      action: PayloadAction<UpdatePostJobType["errors"]>
    ) => {
      state.updateJob.errors = action.payload;
    },
    resetUpdateJobData: (state) => {
      state.updateJob = initialUpdateJobState;
    },
  },
});

export const {
  setPostJobData,
  setPostJobErrors,
  resetPostJobData,
  setUpdateJobData,
  setUpdateJobErrors,
  resetUpdateJobData,
} = postJobSlice.actions;
export const postJobReducer = postJobSlice.reducer;
