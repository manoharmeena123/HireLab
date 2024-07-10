import dynamic from "next/dynamic";
import { Suspense } from "react";
import Loading from "@/components/Loading";

const BrowseJobGrid = dynamic(() => import("@/markup/Element/BrowseJobGrid"), {
  ssr: false,
});

const BrowseJobGridPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <BrowseJobGrid />
    </Suspense>
  );
};

export default BrowseJobGridPage;
