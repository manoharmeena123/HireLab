import dynamic from "next/dynamic";
import { Suspense } from "react";
import Loading from "@/components/Loading";

const ApplyJobSection = dynamic(
  () => import("@/markup/Element/ApplyJobSection"),
  {
    ssr: false,
    loading: () => <Loading />,
  }
);

const ApplyJobSectionPage = () => {
  return <ApplyJobSection />;
};

export default ApplyJobSectionPage;
