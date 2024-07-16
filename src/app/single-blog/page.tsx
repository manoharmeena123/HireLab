import dynamic from "next/dynamic";
import { Suspense } from "react";
import Loading from "@/components/Loading";

const SingleBlogSection = dynamic(() => import("@/markup/Element/SingleBlogSection"), {
  ssr: false,
  loading: () => <Loading />,
});

const SingleBlogSectionPage = () => {
  return <SingleBlogSection />;
};

export default SingleBlogSectionPage;
