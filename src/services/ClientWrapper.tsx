"use client";
import React, { ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import { publicRoutes, privateRoutes } from "@/services/route";
import AuthRoutes from "@/services/AuthRoutes";

const allRoutes = [...publicRoutes, ...privateRoutes];

const ClientWrapper = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();

  const isPublicRoute = publicRoutes.includes(pathname);
  const isPrivateRoute = privateRoutes.includes(pathname);

  return isPublicRoute || !isPrivateRoute ? (
    children
  ) : (
    <AuthRoutes>{children}</AuthRoutes>
  );
};

export default ClientWrapper;
