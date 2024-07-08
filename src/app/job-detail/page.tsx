// app/single-discussion/page.tsx
import dynamic from "next/dynamic";
import { Suspense } from "react";
import Loading from "@/components/Loading";
const JobDetails = dynamic(
  () => import("@/markup/Element/JobDetails"),
  {
    ssr: false,
  }
);

const JobDetailsPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <JobDetails />
    </Suspense>
  );
};

export default JobDetailsPage;
