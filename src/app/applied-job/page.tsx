import dynamic from "next/dynamic";
import { Suspense } from "react";
import Loading from "@/components/Loading";

const AppliedJobSection = dynamic(
  () => import("@/markup/Element/AppliedJobSection"),
  {
    ssr: false,
    loading: () => <Loading />,
  }
);

const AppliedJobSectionPage = () => {
  return <AppliedJobSection />;
};

export default AppliedJobSectionPage;
