import { RootState } from '@/store'; // Adjust the path as per your project structure
import { createSelector } from '@reduxjs/toolkit';
import { BlogsState, EventsState, SectorState, RecentJobsState } from '@/types/index';

// Select the entire global state
export const selectGlobalState = (state: RootState) => state.global;

// Blog Selectors
export const selectBlogsState = createSelector(
  selectGlobalState,
  (globalState) => ({
    blogs: globalState.blogs,
    loading: globalState.loading,
    error: globalState.error,
  })
);

export const selectBlogs = createSelector(
  selectBlogsState,
  (blogsState) => blogsState.blogs
);

export const selectBlogsLoading = createSelector(
  selectBlogsState,
  (blogsState) => blogsState.loading
);

export const selectBlogsError = createSelector(
  selectBlogsState,
  (blogsState) => blogsState.error
);

// Event Selectors
export const selectEventsState = createSelector(
  selectGlobalState,
  (globalState) => ({
    events: globalState.events,
    loading: globalState.loading,
    error: globalState.error,
  })
);

export const selectEvents = createSelector(
  selectEventsState,
  (eventsState) => eventsState.events
);

export const selectEventsLoading = createSelector(
  selectEventsState,
  (eventsState) => eventsState.loading
);

export const selectEventsError = createSelector(
  selectEventsState,
  (eventsState) => eventsState.error
);

// Sector Selectors
export const selectSectorsState = createSelector(
  selectGlobalState,
  (globalState) => ({
    sector: globalState.sector,
    loading: globalState.sectorloading,
    error: globalState.sectorerror,
  })
);

export const selectSectors = createSelector(
  selectSectorsState,
  (sectorsState) => sectorsState.sector
);

export const selectSectorsLoading = createSelector(
  selectSectorsState,
  (sectorsState) => sectorsState.loading
);

export const selectSectorsError = createSelector(
  selectSectorsState,
  (sectorsState) => sectorsState.error
);

// Recent Jobs Selectors
export const selectRecentJobsState = createSelector(
  selectGlobalState,
  (globalState) => ({
    recent: globalState.recent,
    loading: globalState.recentloading,
    error: globalState.recenterror,
  })
);

export const selectRecentJobs = createSelector(
  selectRecentJobsState,
  (recentJobsState) => recentJobsState.recent
);

export const selectRecentJobsLoading = createSelector(
  selectRecentJobsState,
  (recentJobsState) => recentJobsState.loading
);

export const selectRecentJobsError = createSelector(
  selectRecentJobsState,
  (recentJobsState) => recentJobsState.error
);

// Get Jobs
export const selectJobsState = createSelector(
  selectGlobalState,
  (globalState) => ({
    jobs: globalState.jobs,
    loading: globalState.jobsloading,
    error: globalState.jobserror,
  })
);

export const selectJobs = createSelector(
  selectJobsState,
  (jobsState) => jobsState.jobs
);

export const selectJobsLoading = createSelector(
  selectJobsState,
  (jobsState) => jobsState.loading
);

export const selectJobsError = createSelector(
  selectJobsState,
  (jobsState) => jobsState.error
);


//apply job

// Apply Job Selectors
export const selectApplyJobState = createSelector(
  selectGlobalState,
  (globalState) => ({
    applyJob: globalState.applyJob,
    loading: globalState.applyJobLoading,
    error: globalState.applyJobError,
  })
);

export const selectApplyJob = createSelector(
  selectApplyJobState,
  (applyJobState) => applyJobState.applyJob
);

export const selectApplyJobLoading = createSelector(
  selectApplyJobState,
  (applyJobState) => applyJobState.loading
);

export const selectApplyJobError = createSelector(
  selectApplyJobState,
  (applyJobState) => applyJobState.error
);


// Save Job Selectors
export const selectSaveJobState = createSelector(
  selectGlobalState,
  (globalState) => ({
    saveJob: globalState.saveJob,
    loading: globalState.saveJobLoading,
    error: globalState.saveJobError,
  })
);

export const selectSaveJob = createSelector(
  selectSaveJobState,
  (saveJobState) => saveJobState.saveJob
);

export const selectSaveJobLoading = createSelector(
  selectSaveJobState,
  (saveJobState) => saveJobState.loading
);

export const selectSaveJobError = createSelector(
  selectSaveJobState,
  (saveJobState) => saveJobState.error
);
