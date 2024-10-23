// app/single-discussion/page.tsx
import dynamic from "next/dynamic";
import { Suspense } from "react";
import Loading from "@/components/Loading";

const MyCommunity = dynamic(
  () => import("@/markup/Element/MyCommunity"),
  {
    ssr: false,
    loading: () => <Loading />,
  }
);

const MyCommunityPage = () => {
  return <MyCommunity />;
};

export default MyCommunityPage;
