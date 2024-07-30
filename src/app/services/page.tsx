import dynamic from "next/dynamic";
import { Suspense } from "react";
import Loading from "@/components/Loading";

const ServicesSection = dynamic(() => import("@/markup/Element/ServicesSection"), {
  ssr: false,
  loading: () => <Loading />,
});

const ServicesSectionPage = () => {
  return <ServicesSection />;
};

export default ServicesSectionPage;
