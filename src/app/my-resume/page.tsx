import dynamic from "next/dynamic";
import { Suspense } from "react";
import Loading from "@/components/Loading";

const JobMyResumeSection = dynamic(
  () => import("@/markup/Element/Resume/JobMyResume"),
  {
    ssr: false,
    loading: () => <Loading />,
  }
);

const JobSeekerSectionPage = () => {
  return <JobMyResumeSection />;
};

export default JobSeekerSectionPage;
