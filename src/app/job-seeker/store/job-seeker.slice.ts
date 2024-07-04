
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WritableProfileFormData } from "../types";

interface ProfileState {
  profile: WritableProfileFormData | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ProfileState = {
  profile: null,
  status: "idle",
  error: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<WritableProfileFormData>) => {
      state.profile = action.payload;
      state.status = "succeeded";
    },
    // resetProfile: () => initialState,
    setProfileStatus: (
      state,
      action: PayloadAction<ProfileState["status"]>
    ) => {
      state.status = action.payload;
    },
    setProfileError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setProfile, setProfileStatus, setProfileError } =
  profileSlice.actions;
export const JobSeekerReducer = profileSlice.reducer;
