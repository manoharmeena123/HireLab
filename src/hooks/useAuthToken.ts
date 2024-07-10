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
    const storedToken = getCookie(TOKEN_KEY);
    const storedUser = localStorage.getItem(USER_KEY);
    
    if (storedToken) {
      setToken(storedToken);
    }

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const saveToken = (newToken: string, userData: any) => {
    setToken(newToken);
    setUser(userData);
    setCookie(TOKEN_KEY, newToken, { secure: true });
    localStorage.setItem(USER_KEY, JSON.stringify(userData));
  };

  const removeToken = () => {
    try {
      setToken(null);
      setUser(null);
      removeCookie(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
      toast.success("Logout Successfully")
    } catch (error:any) {
      toast.error(error.message)
    }
  };

  return {
    token,
    user,
    saveToken,
    removeToken,
  };
};

