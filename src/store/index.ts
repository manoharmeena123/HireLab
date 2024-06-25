// src/store/index.ts
import { combineReducers } from "@reduxjs/toolkit";
import { configureStoreInit, hirelabApiSlice } from "@/rtk";
import { registerReducer } from "@/app/register/store/register.slice";
import { loginReducer } from "@/app/login/store/login.slice";
import { storeMiddleware } from "@/rtk/middlewares";
import { postJobReducer } from '@/app/post-job/store/post-job.slice';
// Combine all reducers into a single root reducer
const appReducer = combineReducers({
  [hirelabApiSlice.reducerPath]: hirelabApiSlice.reducer,
  register: registerReducer,
  login: loginReducer,
  postJob: postJobReducer
});

export const makeStore = () =>
  configureStoreInit<RootState>({
    appReducer,
    middleware: [],
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<typeof appReducer>;
export type AppDispatch = AppStore["dispatch"];
