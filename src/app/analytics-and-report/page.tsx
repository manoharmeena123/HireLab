import dynamic from "next/dynamic";
import { Suspense } from "react";
import Loading from "@/components/Loading";

const AnalyticsReport = dynamic(() => import("@/markup/Element/Analytics&Report"), {
  ssr: false,
});

const AnalyticsReportPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <AnalyticsReport />
    </Suspense>
  );
};

export default AnalyticsReportPage;
