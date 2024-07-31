import dynamic from "next/dynamic";
import { Suspense } from "react";
import Loading from "@/components/Loading";

const CreditEarnedSection = dynamic(
  () => import("@/markup/Element/CreditEarnedSection"),
  {
    ssr: false,
    loading: () => <Loading />,
  }
);

const CreditEarnedSectionPage = () => {
  return <CreditEarnedSection />;
};

export default CreditEarnedSectionPage;
