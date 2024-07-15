import dynamic from "next/dynamic";
import { Suspense } from "react";
import Loading from "@/components/Loading";

const SingleEvent = dynamic(() => import("@/markup/Element/SingleEvent"), {
  ssr: false,
  loading: () => <Loading />,
});

const SingleEventPage = () => {
  return <SingleEvent />;
};

export default SingleEventPage;
