// app/single-discussion/page.tsx
import dynamic from "next/dynamic";
import { Suspense } from "react";
import Loading from "@/components/Loading";

const FaqSectionSection = dynamic(
  () => import("@/markup/Element/FaqSection"),
  {
    ssr: false,
    loading: () => <Loading />,
  }
);

const FaqSectionPage = () => {
  return <FaqSectionSection />;
};

export default FaqSectionPage;
