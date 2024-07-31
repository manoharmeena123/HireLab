import dynamic from "next/dynamic";
import { Suspense } from "react";
import Loading from "@/components/Loading";

const TermsAndConditionSection = dynamic(() => import("@/markup/Element/TermsAndCondition"), {
  ssr: false,
  loading: () => <Loading />,
});

const TermsAndConditionPage = () => {
  return <TermsAndConditionSection />;
};

export default TermsAndConditionPage;
