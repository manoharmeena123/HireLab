import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BlogsState, BlogResponse, EventsState, EventResponse, SectorState, RecentJobsState,GetJobsState,
   WritableRecentJobResponse, SectorResponse,ApplyJobState,ApplyJobResponse,SaveJobDataState,SaveJobDataResponse } from '@/types/index';

// Define initial states for both blogs and events
const initialBlogsState: BlogsState = {
  blogs: [],
  loading: false,
  error: null,
};

const initialEventsState: EventsState = {
  events: [],
  loading: false,
  error: null,
};

const initialSectorState: SectorState = {
  sector: [],
  sectorloading: false,
  sectorerror: null,
};

const initialRecentJobsState: RecentJobsState = {
  recent: [],
  recentloading: false,
  recenterror: null,
};

const initialGetJobsState: GetJobsState = {
  jobs: [],
  jobsloading: false,
  jobserror: null,
};

const initialApplyJobState: ApplyJobState = {
  applyJob: [],
  applyJobLoading: false,
  applyJobError: null,
};
const initialSaveJobState: SaveJobDataState = {
  saveJob: [],
  saveJobLoading: false,
  saveJobError: null,
};
const globalSlice = createSlice({
  name: 'global',
  initialState: {
    ...initialBlogsState,
    ...initialEventsState,
    ...initialSectorState,
    ...initialRecentJobsState,
    ...initialGetJobsState,
    ...initialApplyJobState,
    ...initialSaveJobState
  },
  reducers: {
    // Reducers for managing blogs state
    fetchBlogsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchBlogsSuccess: (state, action: PayloadAction<BlogResponse>) => {
      state.blogs = action.payload.data;
      state.loading = false;
    },
    fetchBlogsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Reducers for managing events state
    fetchEventsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchEventsSuccess: (state, action: PayloadAction<EventResponse>) => {
      state.events = action.payload.data;
      state.loading = false;
    },
    fetchEventsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Reducers for managing sectors state
    fetchSectorsStart: (state) => {
      state.sectorloading = true;
      state.sectorerror = null;
    },
    fetchSectorsSuccess: (state, action: PayloadAction<SectorResponse>) => {
      state.sector = action.payload.data;
      state.sectorloading = false;
    },
    fetchSectorsFailure: (state, action: PayloadAction<string>) => {
      state.sectorloading = false;
      state.sectorerror = action.payload;
    },

    // Reducers for managing recent jobs state
    fetchRecentJobsStart: (state) => {
      state.recentloading = true;
      state.recenterror = null;
    },
    fetchRecentJobsSuccess: (state, action: PayloadAction<WritableRecentJobResponse>) => {
      state.recent = action.payload.data;
      state.recentloading = false;
    },
    fetchRecentJobsFailure: (state, action: PayloadAction<string>) => {
      state.recentloading = false;
      state.recenterror = action.payload;
    },

    // get jobs state
    fetchGetJobsStart: (state) => {
      state.recentloading = true;
      state.recenterror = null;
    },
    fetchGetJobsSuccess: (state, action: PayloadAction<WritableRecentJobResponse>) => {
      state.recent = action.payload.data;
      state.recentloading = false;
    },
    fetchGetJobsFailure: (state, action: PayloadAction<string>) => {
      state.recentloading = false;
      state.recenterror = action.payload;
    },

     // Reducers for managing applyJob state
     fetchApplyJobStart: (state) => {
      state.applyJobLoading = true;
      state.applyJobError = null;
    },
    fetchApplyJobSuccess: (state, action: PayloadAction<ApplyJobResponse>) => {
      state.applyJob = action.payload.data;
      state.applyJobLoading = false;
    },
    fetchApplyJobFailure: (state, action: PayloadAction<string>) => {
      state.applyJobLoading = false;
      state.applyJobError = action.payload;
    },

     // Reducers for  saveJob state
     fetchSaveJobStart: (state) => {
      state.saveJobLoading = true;
      state.saveJobError = null;
    },
    fetchSaveJobSuccess: (state, action: PayloadAction<SaveJobDataResponse>) => {
      state.saveJob = action.payload.data;
      state.saveJobLoading = false;
    },
    fetchSaveJobFailure: (state, action: PayloadAction<string>) => {
      state.saveJobLoading = false;
      state.saveJobError = action.payload;
    },
  },
});

export const {
  fetchBlogsStart,
  fetchBlogsSuccess,
  fetchBlogsFailure,
  fetchEventsStart,
  fetchEventsSuccess,
  fetchEventsFailure,
  fetchSectorsStart,
  fetchSectorsSuccess,
  fetchSectorsFailure,
  fetchRecentJobsStart,
  fetchRecentJobsSuccess,
  fetchRecentJobsFailure,
  fetchGetJobsStart,
  fetchGetJobsSuccess,
  fetchGetJobsFailure,
  fetchSaveJobStart,
  fetchSaveJobSuccess,
  fetchSaveJobFailure
} = globalSlice.actions;

export const globalEventReducer = globalSlice.reducer;
