// app/single-discussion/page.tsx
import dynamic from "next/dynamic";
import { Suspense } from "react";
import Loading from "@/components/Loading";

const CvManagerSection = dynamic(() => import("@/markup/Element/CvManager"), {
  ssr: false,
  loading: () => <Loading />,
});

const CvManagerSectionPage = () => {
  return <CvManagerSection />;
};

export default CvManagerSectionPage;
