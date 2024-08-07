import dynamic from "next/dynamic";
import { Suspense } from "react";
import Loading from "@/components/Loading";

const ViewAllDiscusssionSection = dynamic(
  () => import("@/markup/Element/ViewAllDiscusssion"),
  {
    ssr: false,
    loading: () => <Loading />,
  }
);

const ViewAllDiscusssionPage = () => {
  return <ViewAllDiscusssionSection />;
};

export default ViewAllDiscusssionPage;
