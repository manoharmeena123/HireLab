import dynamic from "next/dynamic";
import { Suspense } from "react";
import Loading from "@/components/Loading";

const Browsejobfilterlist = dynamic(() => import("@/markup/Element/Browsejobfilterlist"), {
  ssr: false,
});

const BrowsejobfilterlistPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Browsejobfilterlist />
    </Suspense>
  );
};

export default BrowsejobfilterlistPage;
