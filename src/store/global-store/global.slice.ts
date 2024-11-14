import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BlogsState, BlogResponse, EventsState, EventResponse, SectorState, RecentJobsState,GetJobsState,
   WritableRecentJobResponse, SectorResponse,ApplyJobState,ApplyJobResponse,SaveJobDataState,SaveJobDataResponse,
   WritableBuyPassState, 
   WritableBuyPassResponse,SettingState, // Correct type name
   SettingResponse ,BannerState, BannerResponse, SaveContactDataState,
   SaveContactDataResponse} from '@/types/index';

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

// Define initial states for buyPass
const initialBuyPassState: WritableBuyPassState = {
  buyPass: [],
  buyPassLoading: false,
  buyPassError: null,
};

const initialSettingState: SettingState = {
  setting: null,
  loading: false,
  error: null,
};

const initialBannerState: BannerState = {
  banner: null,
  loading: false,
  error: null,
};

const initialSaveContactState: SaveContactDataState = {
  saveContact: [],
  saveContactLoading: false,
  saveContactError: null,
};
// Initial state for the login sidebar visibility
const initialLoginState :any = {
  showLoginSidebar: false,
  showSignUpSidebar: false,
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
    ...initialSaveJobState,
    ...initialBuyPassState,
    ...initialSettingState,
    ...initialBannerState,
    ...initialSaveContactState,
    ...initialLoginState
  },
  reducers: {
     // Action to show the login sidebar
     showLoginSidebar: (state) => {
      state.showLoginSidebar = true;
      state.showSignUpSidebar = false;  // Close the signup sidebar
    },
    // Action to show the signup sidebar
    showSignUpSidebar: (state) => {
      state.showSignUpSidebar = true;
      state.showLoginSidebar = false;  // Close the login sidebar
    },
    // Action to close both sidebars
    closeSidebars: (state) => {
      state.showLoginSidebar = false;
      state.showSignUpSidebar = false;
    },
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

     // Reducers for buyPass state
     fetchBuyPassStart: (state) => {
      state.buyPassLoading = true;
      state.buyPassError = null;
    },
    fetchBuyPassSuccess: (state, action: PayloadAction<WritableBuyPassResponse>) => {
      state.buyPass = action.payload.data;
      state.buyPassLoading = false;
    },
    fetchBuyPassFailure: (state, action: PayloadAction<string>) => {
      state.buyPassLoading = false;
      state.buyPassError = action.payload;
    },

      // Reducers for managing settings state
      fetchSettingStart: (state) => {
        state.loading = true;
        state.error = null;
      },
      fetchSettingSuccess: (state, action: PayloadAction<SettingResponse>) => {
        state.setting = action.payload.data;
        state.loading = false;
      },
      fetchSettingFailure: (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.error = action.payload;
      },
      // Reducers for managing banner state
    fetchBannerStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchBannerSuccess: (state, action: PayloadAction<BannerResponse>) => {
      state.banner = action.payload.data;
      state.loading = false;
    },
    fetchBannerFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
   // Reducers for saveContact state
   fetchSaveContactStart: (state) => {
    state.saveContactLoading = true;
    state.saveContactError = null;
  },
  fetchSaveContactSuccess: (state, action: PayloadAction<SaveContactDataResponse>) => {
    state.saveContact = action.payload.data;
    state.saveContactLoading = false;
  },
  fetchSaveContactFailure: (state, action: PayloadAction<string>) => {
    state.saveContactLoading = false;
    state.saveContactError = action.payload;
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
  fetchSaveJobFailure,
  fetchBuyPassStart,
  fetchBuyPassSuccess,
  fetchBuyPassFailure,
  fetchSettingStart,
  fetchSettingSuccess,
  fetchSettingFailure,
  fetchBannerStart,
  fetchBannerSuccess,
  fetchBannerFailure,
  fetchSaveContactStart,
  fetchSaveContactSuccess,
  fetchSaveContactFailure,
  showLoginSidebar, showSignUpSidebar, closeSidebars
} = globalSlice.actions;
// Export actions

export const globalEventReducer = globalSlice.reducer;
