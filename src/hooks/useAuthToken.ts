"use client"
// src/hooks/useAuthToken.ts
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { setCookie, getCookie, removeCookie } from 'typescript-cookie';

const TOKEN_KEY = 'cred';
const USER_KEY = 'user';

export const useAuthToken = () => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Check if we are in a browser environment
    if (typeof window !== 'undefined') {
      const storedToken = getCookie(TOKEN_KEY);
      const storedUser = localStorage.getItem(USER_KEY);

      if (storedToken) {
        setToken(storedToken);
      }

      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
        } catch (error) {
          console.error("Failed to parse stored user data:", error);
          // Optionally remove the invalid item from localStorage
          localStorage.removeItem(USER_KEY);
        }
      }
    }
  }, []);

  const saveToken = (newToken: string, userData: any) => {
    setToken(newToken);
    setUser(userData);
    setCookie(TOKEN_KEY, newToken, { secure: true });
    if (typeof window !== 'undefined') {
      localStorage.setItem(USER_KEY, JSON.stringify(userData));
    }
  };

  const removeToken = () => {
    try {
      setToken(null);
      setUser(null);
      removeCookie(TOKEN_KEY);
      if (typeof window !== 'undefined') {
        localStorage.removeItem(USER_KEY);
      }
      toast.success("Logout Successfully");
      window.location.reload();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return {
    token,
    user,
    saveToken,
    removeToken,
  };
};
