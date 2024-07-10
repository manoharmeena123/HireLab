import dynamic from "next/dynamic";
import { Suspense } from "react";
import Loading from "@/components/Loading";

const CreditEarnedSection = dynamic(() => import("@/markup/Element/CreditEarnedSection"), {
  ssr: false,
});

const CreditEarnedSectionPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <CreditEarnedSection />
    </Suspense>
  );
};

export default CreditEarnedSectionPage;
