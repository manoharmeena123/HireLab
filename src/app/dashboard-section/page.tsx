import dynamic from "next/dynamic";
import { Suspense } from "react";
import Loading from "@/components/Loading";

const DashboardSection = dynamic(() => import("@/markup/Element/DashBoardSection"), {
  ssr: false,
});

const DashboardSectionPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <DashboardSection />
    </Suspense>
  );
};

export default DashboardSectionPage;
