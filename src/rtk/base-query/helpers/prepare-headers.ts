import { getCookie } from 'typescript-cookie';

export const prepareHeaders = (headers: Headers) => {
  const accessToken = getCookie('cred');

  if (accessToken) headers.set('Authorization', `Bearer ${accessToken}`);
};
