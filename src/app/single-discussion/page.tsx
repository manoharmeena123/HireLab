// app/single-discussion/page.tsx
import dynamic from "next/dynamic";
import { Suspense } from "react";
import Loading from "@/components/Loading";
const SingleDiscussion = dynamic(
  () => import("@/markup/Element/SingleDiscussion"),
  {
    ssr: false,
  }
);

const SingleDiscussionPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <SingleDiscussion />
    </Suspense>
  );
};

export default SingleDiscussionPage;
