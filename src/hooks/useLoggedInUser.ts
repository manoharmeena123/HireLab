"use client";
// src/hooks/useLoggedInUser.ts
import { useState, useEffect } from 'react';
import { useGetLoggedInUserQuery } from "@/app/login/store/login.query";

export const useLoggedInUser = () => {
  const { data, error, isLoading, refetch } = useGetLoggedInUserQuery();
  const [user, setUser] = useState<any | null>(null);
  const [fetchError, setFetchError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (isLoading) {
      setLoading(true);
    } else if (error) {
      setLoading(false);
      setFetchError(error as Error);
    } else if (data) {
      setLoading(false);
      setUser(data);
    }
  }, [data, error, isLoading]);

  const refetchUser = async () => {
    setLoading(true);
    setFetchError(null);
    try {
      await refetch();
    } catch (error) {
      setFetchError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    error: fetchError,
    isLoading: loading,
    refetch: refetchUser
  };
};
