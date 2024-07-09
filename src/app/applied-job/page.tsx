import dynamic from "next/dynamic";
import { Suspense } from "react";
import Loading from "@/components/Loading";

const AppliedJobSection = dynamic(() => import("@/markup/Element/AppliedJobSection"), {
  ssr: false,
});

const AppliedJobSectionPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <AppliedJobSection />
    </Suspense>
  );
};

export default AppliedJobSectionPage;
