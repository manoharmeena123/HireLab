// app/single-discussion/page.tsx
import dynamic from "next/dynamic";
import { Suspense } from "react";
import Loading from "@/components/Loading";
const SingleDiscussion = dynamic(
  () => import("@/markup/Element/SingleDiscussion"),
  {
    ssr: false,
    loading: () => <Loading />,
  }
);

const SingleDiscussionPage = () => {
  return <SingleDiscussion />;
};

export default SingleDiscussionPage;
