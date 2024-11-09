import dynamic from "next/dynamic";
import { Suspense } from "react";
import Loading from "@/components/Loading";

const WhyChooseUsSection = dynamic(
  () => import("@/markup/Element/WhyChooseUs"),
  {
    ssr: false,
    loading: () => <Loading />,
  }
);

const WhyChooseUsPage = () => {
  return <WhyChooseUsSection />;
};

export default WhyChooseUsPage;
