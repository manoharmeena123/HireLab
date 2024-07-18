//resume.selectors.ts

import { createSelector } from 'reselect';
import { RootState } from '@/store';

const selectResumeState = (state: RootState) => state.resume;

export const selectResumeHeadline = createSelector(
  [selectResumeState],
  (resume) => resume.headline
);

export const selectResumeKeySkills = createSelector(
  [selectResumeState],
  (resume) => resume.keySkills
);

export const selectResumeLoading = createSelector(
  [selectResumeState],
  (resume) => resume.loading
);

export const selectResumeError = createSelector(
  [selectResumeState],
  (resume) => resume.error
);
