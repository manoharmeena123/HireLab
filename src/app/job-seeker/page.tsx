import dynamic from "next/dynamic";
import { Suspense } from "react";
import Loading from "@/components/Loading";

const JobSeekerSection = dynamic(() => import("@/markup/Element/JobSeekerSection"), {
  ssr: false,
});

const JobSeekerSectionPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <JobSeekerSection />
    </Suspense>
  );
};

export default JobSeekerSectionPage;
