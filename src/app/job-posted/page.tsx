import dynamic from "next/dynamic";
import { Suspense } from "react";
import Loading from "@/components/Loading";

const JobPostedSection = dynamic(() => import("@/markup/Element/JobPostedSection"), {
  ssr: false,
});

const JobPostedSectionPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <JobPostedSection />
    </Suspense>
  );
};

export default JobPostedSectionPage;
