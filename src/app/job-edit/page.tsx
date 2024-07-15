// app/single-discussion/page.tsx
import dynamic from "next/dynamic";
import { Suspense } from "react";
import Loading from "@/components/Loading";

const EditJobSection = dynamic(
  () => import("@/markup/Element/JobEditSection"),
  {
    ssr: false,
    loading: () => <Loading />,
  }
);

const EditJobSectionPage = () => {
  return <EditJobSection />;
};

export default EditJobSectionPage;
