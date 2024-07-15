// app/single-discussion/page.tsx
import dynamic from "next/dynamic";
import { Suspense } from "react";
import Loading from "@/components/Loading";

const JobSavedSection = dynamic(
  () => import("@/markup/Element/JobSavedSection"),
  {
    ssr: false,
    loading: () => <Loading />,
  }
);

const JobSavedSectionPage = () => {
  return <JobSavedSection />;
};

export default JobSavedSectionPage;
