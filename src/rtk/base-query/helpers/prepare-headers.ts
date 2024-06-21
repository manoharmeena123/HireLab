import { RootState } from '@/store';

export const prepareHeaders = (headers: Headers, { getState }: { getState: () => RootState }) => {
  const state = getState();
  const token = state.login.token;
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  return headers;
};
