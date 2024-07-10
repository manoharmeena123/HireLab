// app/single-discussion/page.tsx
import dynamic from "next/dynamic";
import { Suspense } from "react";
import Loading from "@/components/Loading";
const ManageJobsSection = dynamic(() => import("@/markup/Element/ManageJobsSection"),
  {
    ssr: false,
  }
);

const ManageJobsSectionPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <ManageJobsSection />
    </Suspense>
  );
};

export default ManageJobsSectionPage;
