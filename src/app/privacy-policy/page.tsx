import dynamic from "next/dynamic";
import { Suspense } from "react";
import Loading from "@/components/Loading";

const PrivacyPolicySection = dynamic(() => import("@/markup/Element/PrivacyPolicy"), {
  ssr: false,
  loading: () => <Loading />,
});

const PrivacyPolicyPage = () => {
  return <PrivacyPolicySection />;
};

export default PrivacyPolicyPage;
