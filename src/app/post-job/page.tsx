import dynamic from "next/dynamic";
import { Suspense } from "react";
import Loading from "@/components/Loading";

const PostJobSection = dynamic(() => import("@/markup/Element/PostJobSection"), {
  ssr: false,
});

const PostJobSectionPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <PostJobSection />
    </Suspense>
  );
};

export default PostJobSectionPage;
