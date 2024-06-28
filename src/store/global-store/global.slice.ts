import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BlogsState, BlogResponse, EventsState, EventResponse, Blog, Event } from '@/types/blog';

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

// Create a combined slice for managing both blogs and events state
const globalSlice = createSlice({
  name: 'blogEvent',
  initialState: {
    ...initialBlogsState,
    ...initialEventsState,
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
    fetchEventsSuccess: (state, action: PayloadAction<EventResponse[]>) => {
      state.events = action.payload.flatMap(response => response.data);
      state.loading = false;
    },
    fetchEventsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
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
} = globalSlice.actions;

export const globalEventReducer = globalSlice.reducer;
