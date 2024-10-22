import dynamic from "next/dynamic";
import { Suspense } from "react";
import Loading from "@/components/Loading";

const JobPosterDashboard = dynamic(() => import("@/markup/Element/JobPosterDashboard"), {
  ssr: false,
});

const JobPosterDashboardPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <JobPosterDashboard />
    </Suspense>
  );
};

export default JobPosterDashboardPage;
