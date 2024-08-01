import dynamic from "next/dynamic";
import { Suspense } from "react";
import Loading from "@/components/Loading";

const Browsejobfilterlist = dynamic(
  () => import("@/markup/Element/Browsejobfilterlist"),
  {
    ssr: false,
    loading: () => <Loading />,
  }
);

const BrowsejobfilterlistPage = () => {
  return <Browsejobfilterlist />;
};

export default BrowsejobfilterlistPage;
