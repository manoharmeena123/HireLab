// src/app/post-job/store/post-job.selectors.ts

import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/store';
import { PostJobState } from '../types';

const postJobSelector = (state: RootState): PostJobState => state.postJob;

export const selectPostJobState = createSelector(
  postJobSelector,
  (state) => state
);

export const selectPostJobErrors = createSelector(
  postJobSelector,
  (state) => state.errors
);
