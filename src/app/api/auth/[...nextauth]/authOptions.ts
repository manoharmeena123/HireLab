// src/pages/api/auth/[...nextauth]/authOptions.ts
import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { CustomSession, CustomUser, LoginResponse } from './types/index';
import axios from 'axios';
import { LOGIN_URL } from '@/lib/apiEndPoints';

export const authOptions: AuthOptions = {
  pages: {
    signIn: '/',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user as CustomUser;
      }
      return token;
    },

    async session({ session, token }) {
      session.user = token.user as CustomUser;
      return session;
    },
  },

  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        mobile_number: { label: 'Mobile Number', type: 'text' },
      },
      async authorize(credentials, req) {
        const res = await axios.post<LoginResponse>(LOGIN_URL, credentials);
        const response = res.data;

        const user: CustomUser = response.user;

        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
};
