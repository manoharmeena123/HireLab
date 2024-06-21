// src/rtk/base-query/index.ts
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { setupListeners } from '@reduxjs/toolkit/query';
import { Middleware, Reducer, configureStore, UnknownAction } from '@reduxjs/toolkit';
import { storeMiddleware } from './middlewares';
export * from './base-query';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let store: any = null;

export function configureStoreInit<T>({
  appReducer,
  middleware,
}: {
  appReducer: Reducer<T, UnknownAction>;
  middleware?: Middleware[];
}) {
  store = configureStore({
    reducer: appReducer,
    middleware: (defaultMiddleWares) => storeMiddleware(defaultMiddleWares(), middleware),
  });

  // optional, but required for refetchOnFocus/refetchOnReconnect behaviors
  // see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
  setupListeners(store.dispatch);

  return store;
}

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export * from './types/index.d';

// src/rtk/index.ts
export * from './base-query';
export * from './middlewares';
export * from './types/index.d'
