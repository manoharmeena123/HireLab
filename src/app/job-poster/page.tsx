import dynamic from "next/dynamic";
import { Suspense } from "react";
import Loading from "@/components/Loading";

const JobPosterSection = dynamic(() => import("@/markup/Element/JobPosterSection"), {
  ssr: false,
});

const JobPosterSectionPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <JobPosterSection />
    </Suspense>
  );
};

export default JobPosterSectionPage;
