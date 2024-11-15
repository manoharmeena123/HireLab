"use client";
import React, { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCookie } from 'typescript-cookie';
import Loading from "@/components/Loading";

const AuthRoutes = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const user = localStorage.getItem("user");
      const accessToken = getCookie('cred');

      if (user && accessToken) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  useEffect(() => {
    if (!loading && !authenticated) {
      router.push("/");
    }
  }, [loading, authenticated, router]);

  if (loading) {
    return <Loading />;
  }

  return <>{children}</>;
};

export default AuthRoutes;
