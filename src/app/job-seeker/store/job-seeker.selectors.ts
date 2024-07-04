import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/store';

const profileSelector = (state: RootState) => state.jobSeeker;

export const selectProfile = createSelector(
  profileSelector,
  (profileState) => profileState.profile
);

export const selectProfileStatus = createSelector(
  profileSelector,
  (profileState) => profileState.status
);

export const selectProfileError = createSelector(
  profileSelector,
  (profileState) => profileState.error
);
