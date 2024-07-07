// src/hooks/useLoggedInUser.ts
import { useGetLoggedInUserQuery } from "@/app/login/store/login.query";

export const useLoggedInUser = () => {
  const { data, error, isLoading, refetch } = useGetLoggedInUserQuery();

  console.log("useLoggedInUser", data);
  return {
    user: data,
    error,
    isLoading,
    refetch
  };
};

