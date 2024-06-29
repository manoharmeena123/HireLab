import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BlogsState, BlogResponse, EventsState, EventResponse, SectorState, RecentJobsState, WritableRecentJobResponse, SectorResponse } from '@/types/index';

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

const globalSlice = createSlice({
  name: 'global',
  initialState: {
    ...initialBlogsState,
    ...initialEventsState,
    ...initialSectorState,
    ...initialRecentJobsState,
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
} = globalSlice.actions;

export const globalEventReducer = globalSlice.reducer;
