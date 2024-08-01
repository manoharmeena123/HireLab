// app/single-discussion/page.tsx
import dynamic from "next/dynamic";
import { Suspense } from "react";
import Loading from "@/components/Loading";

const FreeJobAlertsSection = dynamic(
  () => import("@/markup/Element/FreeJobAlerts"),
  {
    ssr: false,
    loading: () => <Loading />,
  }
);

const FreeJobAlertsPage = () => {
  return <FreeJobAlertsSection />;
};

export default FreeJobAlertsPage;
