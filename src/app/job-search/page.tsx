// app/single-discussion/page.tsx
import dynamic from "next/dynamic";
import { Suspense } from "react";
import Loading from "@/components/Loading";


const JobSearchform = dynamic(
  () => import("@/markup/Element/JobSearchform"),
  {
    ssr: false,
  }
);

const JobSearchformPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <JobSearchform />
    </Suspense>
  );
};

export default JobSearchformPage;
