"use client";
import React, { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";

const AuthRoutes = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [storedUser, setStoredUser] = useState<any>(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setStoredUser(JSON.parse(user));
    } else {
      setStoredUser(null);
      setLoading(false); // Ensure loading is set to false if no user is found
    }
  }, []);

  useEffect(() => {
    if (storedUser === null) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, [storedUser, router]);

  if (loading) {
    return <Loading />;
  }

  return <>{children}</>;
};

export default AuthRoutes;
