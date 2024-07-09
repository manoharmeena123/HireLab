import dynamic from "next/dynamic";
import { Suspense } from "react";
import Loading from "@/components/Loading";

const ApplyJobSection = dynamic(() => import("@/markup/Element/ApplyJobSection"), {
  ssr: false,
});

const ApplyJobSectionPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <ApplyJobSection />
    </Suspense>
  );
};

export default ApplyJobSectionPage;
