import dynamic from "next/dynamic";
import { Suspense } from "react";
import Loading from "@/components/Loading";

const BlogDetailGrid = dynamic(
  () => import("@/markup/Element/BlogDetailGrid"),
  {
    ssr: false,
    loading: () => <Loading />,
  }
);

const BlogDetailGridPage = () => {
  return <BlogDetailGrid />;
};

export default BlogDetailGridPage;
