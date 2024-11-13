"use client";
import "react-toastify/dist/ReactToastify.css";
import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";
import { buildProvidersTree } from "./ProviderTree";
import { StoreProvider } from "./StoreProvider";
import Footer from "@/app/layouts/Footer";
import Header from "@/app/layouts/Header";
// import { useNotificationPermission } from '@/hooks/useNotificationPermission';
// import { useForegroundNotifications } from '@/hooks/useForegroundNotifications';
// import { useServiceWorker } from '@/hooks/useServiceWorker';

interface ProviderTreeProps {
  children: ReactNode;
}

export const ProviderTree: React.FC<ProviderTreeProps> = ({ children }) => {
  const ProvidersTree = buildProvidersTree([[StoreProvider]]);
  
  // Register service worker and set up notification handling
  // useNotificationPermission();
  // useForegroundNotifications();
  // useServiceWorker();

  return (
    <ProvidersTree>
      <Header />
      {children}
      <Footer />
      <ToastContainer />
    </ProvidersTree>
  );
};
