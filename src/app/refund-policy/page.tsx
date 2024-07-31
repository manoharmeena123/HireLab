
import dynamic from "next/dynamic";
import { Suspense } from "react";
import Loading from "@/components/Loading";

const RefundPolicySection = dynamic(
  () => import("@/markup/Element/RefundPolicy"),
  {
    ssr: false,
    loading: () => <Loading />,
  }
);

const RefundPolicyPage = () => {
  return <RefundPolicySection />;
};

export default RefundPolicyPage;
