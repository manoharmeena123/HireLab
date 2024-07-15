import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/store';
import { PostJobState, UpdatePostJobType } from '../types';

const postJobSelector = (state: RootState): PostJobState => state.postJob.postJob;
const updateJobSelector = (state: RootState): UpdatePostJobType => state.postJob.updateJob;

export const selectPostJobState = createSelector(
  postJobSelector,
  (state) => state
);

export const selectPostJobErrors = createSelector(
  postJobSelector,
  (state) => state.errors
);

export const selectUpdateJobState = createSelector(
  updateJobSelector,
  (state) => state
);

export const selectUpdateJobErrors = createSelector(
  updateJobSelector,
  (state) => state.errors
);
