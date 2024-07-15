import dynamic from "next/dynamic";
import { Suspense } from "react";
import Loading from "@/components/Loading";

const DashboardSection = dynamic(
  () => import("@/markup/Element/DashBoardSection"),
  {
    ssr: false,
    loading: () => <Loading />,
  }
);

const DashboardSectionPage = () => {
  return <DashboardSection />;
};

export default DashboardSectionPage;
