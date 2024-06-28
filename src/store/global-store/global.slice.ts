import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BlogResponse,BlogsState } from '@/types/blog';

// Define the initial state
const initialState: BlogsState = {
  blogs: [],
  loading: false,
  error: null,
};

// Create a slice for managing blogs state
const blogsSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    // Reducer for starting the fetch process
    fetchBlogsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    // Reducer for successful fetch of blogs
    fetchBlogsSuccess: (state, action: PayloadAction<BlogResponse[]>) => {
      state.blogs = action.payload;
      state.loading = false;
    },
    // Reducer for failed fetch of blogs
    fetchBlogsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Extract action creators from the slice
export const {
  fetchBlogsStart,
  fetchBlogsSuccess,
  fetchBlogsFailure,
} = blogsSlice.actions;

// Export the reducer function
export const blogsReducer =  blogsSlice.reducer;
