// app/single-discussion/page.tsx
import dynamic from "next/dynamic";
import { Suspense } from "react";
import Loading from "@/components/Loading";

const ManageJobsSection = dynamic(
  () => import("@/markup/Element/ManageJobsSection"),
  {
    ssr: false,
    loading: () => <Loading />,
  }
);

const ManageJobsSectionPage = () => {
  return <ManageJobsSection />;
};

export default ManageJobsSectionPage;
