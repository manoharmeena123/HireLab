import dynamic from "next/dynamic";
import { Suspense } from "react";
import Loading from "@/components/Loading";

const HomepagePage = dynamic(() => import("@/markup/Element/Homepage"), {
  ssr: false,
});

const Homepage= () => {
  return (
    <Suspense fallback={<Loading />}>
      <HomepagePage />
    </Suspense>
  );
};

export default Homepage;
