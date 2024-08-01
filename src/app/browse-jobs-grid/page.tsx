import dynamic from "next/dynamic";
import { Suspense } from "react";
import Loading from "@/components/Loading";

const BrowseJobGrid = dynamic(() => import("@/markup/Element/BrowseJobGrid"), {
  ssr: false,
  loading: () => <Loading />,
});

const BrowseJobGridPage = () => {
  return <BrowseJobGrid />;
};

export default BrowseJobGridPage;
