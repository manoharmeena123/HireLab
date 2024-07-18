
// resume.slice.ts


import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WritableHeadlineDataResponse, WritableKeySkillDataResponse } from '../types/resume';
import { hirelabApiSlice } from '@/rtk/base-query';
import resumeApi from './resume.query';

interface ResumeState {
  headline: WritableHeadlineDataResponse | null;
  keySkills: WritableKeySkillDataResponse | null;
  loading: boolean;
  error: string | null;
}

const initialState: ResumeState = {
  headline: null,
  keySkills: null,
  loading: false,
  error: null,
};

const resumeSlice = createSlice({
  name: 'resume',
  initialState,
  reducers: {
    setHeadline: (state, action: PayloadAction<WritableHeadlineDataResponse>) => {
      state.headline = action.payload;
    },
    setKeySkills: (state, action: PayloadAction<WritableKeySkillDataResponse>) => {
      state.keySkills = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(resumeApi.endpoints.createResumeHeadline.matchFulfilled, (state, action) => {
        state.headline = action.payload;
        state.loading = false;
      })
      .addMatcher(resumeApi.endpoints.createResumeHeadline.matchPending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher(resumeApi.endpoints.createResumeHeadline.matchRejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create resume headline';
      })
      .addMatcher(resumeApi.endpoints.createKeySkill.matchFulfilled, (state, action) => {
        state.keySkills = action.payload;
        state.loading = false;
      })
      .addMatcher(resumeApi.endpoints.createKeySkill.matchPending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher(resumeApi.endpoints.createKeySkill.matchRejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create key skills';
      });
  },
});

export const { setHeadline, setKeySkills, setLoading, setError } = resumeSlice.actions;
export const resumeReducer = resumeSlice.reducer;
