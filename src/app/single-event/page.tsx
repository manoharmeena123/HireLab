import dynamic from "next/dynamic";
import { Suspense } from "react";
import Loading from "@/components/Loading";
import SingleEvent from "@/markup/Element/SingleEvent";

// const SingleEvent = dynamic(() => import("@/markup/Element/SingleEvent"), {
//   ssr: false,
// });

const SingleEventPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <SingleEvent />
    </Suspense>
  );
};

export default SingleEventPage;
