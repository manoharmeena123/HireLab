"use client";
import "react-toastify/dist/ReactToastify.css";
import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";
import { buildProvidersTree } from "./ProviderTree";
import { StoreProvider } from "./StoreProvider";
import Footer from "@/app/layouts/Footer";
import Header from "@/app/layouts/Header";

interface ProviderTreeProps {
  children: ReactNode;
}

export const ProviderTree: React.FC<ProviderTreeProps> = ({ children }) => {
  const ProvidersTree = buildProvidersTree([[StoreProvider]]);

  return (
    <ProvidersTree>
      <Header />
      {children}
      <Footer />
      <ToastContainer />
    </ProvidersTree>
  );
};
