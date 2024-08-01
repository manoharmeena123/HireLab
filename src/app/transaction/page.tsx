// app/single-discussion/page.tsx
import dynamic from "next/dynamic";
import { Suspense } from "react";
import Loading from "@/components/Loading";

const TransactionSection = dynamic(() => import("@/markup/Element/Transaction"), {
  ssr: false,
  loading: () => <Loading />,
});

const TransactionSectionPage = () => {
  return <TransactionSection />;
};

export default TransactionSectionPage;
