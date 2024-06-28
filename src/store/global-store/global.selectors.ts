import { RootState } from '@/store'; // Adjust the path as per your project structure
import { createSelector } from '@reduxjs/toolkit';
import { BlogsState } from '@/types/blog';

// Select the entire blogs state
export const selectBlogsState = (state: RootState): BlogsState => state.global;

// Select the blogs array from the blogs state
export const selectBlogs = createSelector(
  selectBlogsState,
  (blogsState) => blogsState.blogs
);

// Select the loading state from the blogs state
export const selectBlogsLoading = createSelector(
  selectBlogsState,
  (blogsState) => blogsState.loading
);

// Select the error state from the blogs state
export const selectBlogsError = createSelector(
  selectBlogsState,
  (blogsState) => blogsState.error
);
