import dynamic from "next/dynamic";
import { Suspense } from "react";
import Loading from "@/components/Loading";

const SupportSection = dynamic(() => import("@/markup/Element/Support"), {
  ssr: false,
  loading: () => <Loading />,
});

const SupportPage = () => {
  return <SupportSection />;
};

export default SupportPage;
