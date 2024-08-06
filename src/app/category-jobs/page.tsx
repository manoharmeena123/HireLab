import dynamic from "next/dynamic";
import { Suspense } from "react";
import Loading from "@/components/Loading";

const CategoryJobsSection = dynamic(
  () => import("@/markup/Element/CategoryJobs"),
  {
    ssr: false,
    loading: () => <Loading />,
  }
);

const CategoryJobsPage = () => {
  return <CategoryJobsSection />;
};

export default CategoryJobsPage;
